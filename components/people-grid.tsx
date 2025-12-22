import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View
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

export default function PeopleGrid({ people }: PeopleGridProps) {
  const theme = useTheme();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  // Initial view: 7 people + "More" button (8 items total)
  // Expanded view: 14 people (7 + 7) + "Less" button (15 items total)
  // Or: Just show all items and append "Less" at the end.
  // The requirement: "animates to show more 7 contacts".
  // So we show 7 initially.

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const visiblePeople = expanded ? people.slice(0, 15) : people.slice(0, 7);

  const handlePersonPress = (person: Person) => {
    router.push({
      pathname: "/pay-history",
      params: { name: person.name, image: person.image || "" },
    });
  };

  const renderPerson = (person: Person, index: number) => {
    const isImageAvailable = !!person.image;

    // Get initials for avatar if no image
    const initials = person.name.charAt(0).toUpperCase();

    // Randomize avatar color for variety if no image, or use a consistent hash
    // For simplicity, alternating colors based on index
    const avatarColors = [
      "#8AB4F8",
      "#F28B82",
      "#81C995",
      "#FDD663",
      "#F06292",
      "#BA68C8",
    ];
    const backgroundColor = avatarColors[index % avatarColors.length];

    // Text color on colored avatar should be dark or white depending on contrast.
    // GPay usually uses white text on dark/vibrant backgrounds or dark text on light backgrounds.
    // Let's use white text for simplicity on these vibrant colors.
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
  };

  const renderToggleButton = () => {
    const icon = expanded ? "chevron-up" : "chevron-down";
    const label = expanded ? "Less" : "More";

    return (
      <TouchableOpacity
        key="toggle-button"
        onPress={toggleExpand}
        style={styles.itemContainer}
      >
        <View style={styles.avatarContainer}>
          <Avatar.Icon
            size={56}
            icon={icon}
            color={theme.colors.primary}
            style={{
              backgroundColor: theme.dark ? "#303134" : "#F1F3F4",
              borderWidth: 1,
              borderColor: theme.colors.outline,
            }}
          />
        </View>
        <Text
          variant="labelMedium"
          style={[styles.name, { color: theme.colors.onBackground }]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        variant="titleLarge"
        style={[styles.header, { color: theme.colors.onBackground }]}
      >
        People
      </Text>
      <View style={styles.grid}>
        {visiblePeople.map((person, index) => renderPerson(person, index))}
        {renderToggleButton()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 28, // Handled by parent gap
  },
  header: {
    marginBottom: 16,
    fontWeight:'bold'
   },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    // marginHorizontal: -8, // Compensate for padding in items? No, explicitly justify
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "22%", // 4 items per row approx
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 8,
    borderRadius: 28, // Half of 56
    // overflow: 'hidden', // Not needed for Avatar component usually
  },
  name: {
    textAlign: "center",
    fontWeight: "700",
  },
});
