import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const SCAN_FRAME_SIZE = width * 0.7;

export default function ScanQRScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [torch, setTorch] = useState(false);
  
  // Bottom sheet ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['12%', '45%'], []);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      // Handle QR scanning from image here if needed
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 100 }}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <CameraView 
        style={StyleSheet.absoluteFill} 
        facing={facing}
        enableTorch={torch}
        onBarcodeScanned={({ data }) => {
            console.log("Scanned:", data);
            // Handle scan result
        }}
      >
        <SafeAreaView style={styles.overlay}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
            
            <View style={styles.topRightIcons}>
              <TouchableOpacity onPress={() => setTorch(!torch)} style={styles.iconButton}>
                <MaterialCommunityIcons name={torch ? "flashlight" : "flashlight-off"} size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="qr-code" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Scanner Frame */}
          <View style={styles.scannerContainer}>
            <View style={styles.scannerFrame}>
                {/* Corners */}
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>

          {/* Upload Button */}
          <View style={[styles.uploadContainer, {marginBottom: height * 0.25}]}>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Ionicons name="image-outline" size={20} color="#5f6368" />
              <Text style={styles.uploadText}>Upload from gallery</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </CameraView>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.colors.surface }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.onSurfaceVariant }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.sheetHeader}>
            <Text style={[styles.sheetTitle, { color: theme.colors.onSurface }]}>Scan any QR code to pay</Text>
            <Text style={[styles.sheetSubtitle, { color: theme.colors.onSurfaceVariant }]}>Google Pay • PhonePe • Paytm • UPI</Text>
          </View>
          
          <View style={styles.expandedContent}>
             <View style={[styles.phoneIconContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
                <MaterialCommunityIcons name="cellphone-text" size={60} color={theme.colors.onSurfaceVariant} />
                <View style={styles.qrOnPhone}>
                    <MaterialIcons name="qr-code" size={24} color="black" />
                </View>
             </View>
             <Text style={[styles.expandedText, { color: theme.colors.onSurface }]}>Scan any QR code, not just Google Pay&apos;s</Text>
             <Text style={[styles.expandedSubText, { color: theme.colors.onSurfaceVariant }]}>
                 Position your phone to make sure the QR code is within the frame. <Text style={{textDecorationLine: 'underline', color: theme.colors.primary}}>See all supported QR codes</Text>
             </Text>
             
             <View style={styles.logosContainer}>
                 {/* Placeholders for logos */}
                 <Text style={[styles.logoText, { color: theme.colors.onSurface }]}>BHIM</Text>
                 <Text style={[styles.logoText, { color: theme.colors.onSurface }]}>UPI</Text>
                 <Text style={[styles.logoText, { color: theme.colors.onSurface }]}>VISA</Text>
                 <Text style={[styles.logoText, { color: theme.colors.onSurface }]}>Mastercard</Text>
             </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  permissionButton: {
    backgroundColor: '#4285F4',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  topRightIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50, // Adjust to center visually above bottom sheet
  },
  scannerFrame: {
    width: SCAN_FRAME_SIZE,
    height: SCAN_FRAME_SIZE,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 12,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: '#EA4335', // Red
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderColor: '#FBBC04', // Yellow
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: '#4285F4', // Blue
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#34A853', // Green
  },
  uploadContainer: {
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    gap: 8,
  },
  uploadText: {
    color: '#3c4043',
    fontSize: 14,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  sheetHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sheetTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  sheetSubtitle: {
    color: '#9aa0a6',
    fontSize: 14,
  },
  expandedContent: {
      alignItems: 'center',
      width: '100%',
  },
  phoneIconContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#303134',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      position: 'relative',
  },
  qrOnPhone: {
      position: 'absolute',
      backgroundColor: 'white',
      padding: 2,
      borderRadius: 4,
  },
  expandedText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
      textAlign: 'center',
  },
  expandedSubText: {
      color: '#9aa0a6',
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 24,
      paddingHorizontal: 20,
  },
  logosContainer: {
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center',
      opacity: 0.7,
  },
  logoText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
  }
});
