import { useRouter } from "expo-router";
import React, { memo, useCallback, useState } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";

// if (
//   Platform.OS === "android" &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

interface Person {
  name: string;
  image: string | null;
}

interface PeopleGridProps {
  people: Person[];
}

/**
 * Component to display a grid of people.
 * Optimized with memo and callbacks.
 */
const PeopleGrid = memo(function PeopleGrid({ people }: PeopleGridProps) {
  const theme = useTheme();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  // Initial view: 7 people + "More" button (8 items total)
  // Expanded view: 14 people (7 + 7) + "Less" button (15 items total)
  // Or: Just show all items and append "Less" at the end.
  // The requirement: "animates to show more 7 contacts".
  // So we show 7 initially.

  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  }, []);

  const visiblePeople = expanded ? people.slice(0, 15) : people.slice(0, 7);

  const handlePersonPress = useCallback(
    (person: Person) => {
      router.push({
        pathname: "/pay-history",
        params: { name: person.name, image: person.image || "" },
      });
    },
    [router]
  );

  return (
    <View style={styles.gridContainer}>
      {visiblePeople.map((person, index) => {
        const isImageAvailable = !!person.image;
        const initials = person.name.charAt(0).toUpperCase();

        const avatarColors = [
          "#8AB4F8",
          "#F28B82",
          "#81C995",
          "#FDD663",
          "#F06292",
          "#BA68C8",
        ];
        const backgroundColor = avatarColors[index % avatarColors.length];
        const textColor = "#FFFFFF";

        return (
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => handlePersonPress(person)}
          >
            <View style={styles.avatarContainer}>
              {isImageAvailable ? (
                <Avatar.Image size={56} source={{ uri: person.image! }} />
              ) : (
                <Avatar.Text
                  size={56}
                  label={initials}
                  style={{ backgroundColor }}
                  color={textColor}
                  labelStyle={{ fontSize: 28 }}
                />
              )}
            </View>
            <Text
              variant="titleSmall"
              style={[styles.name, { color: theme.colors.onBackground }]}
              numberOfLines={1}
            >
              {person.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.itemContainer} onPress={toggleExpand}>
        <View
          style={[
            styles.avatarContainer,
            { borderWidth: 1, borderColor: theme.colors.outline },
          ]}
        >
          <Avatar.Icon
            size={56}
            icon={expanded ? "chevron-up" : "chevron-down"}
            color={theme.colors.primary}
            style={{ backgroundColor: "transparent" }}
          />
        </View>
        <Text
          variant="titleSmall"
          style={[styles.name, { color: theme.colors.onBackground }]}
          numberOfLines={1}
        >
          {expanded ? "Less" : "More"}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

export default PeopleGrid;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  itemContainer: {
    width: "25%", // 4 items per row
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    marginBottom: 8,
    borderRadius: 999,
  },
  name: {
    textAlign: "center",
    paddingHorizontal: 4,
  },
});
