# Swipi - Human Interface Guidelines & Design System

## 📱 Projekt Übersicht

**Swipi** ist eine professionelle Job-Matching-App (ähnlich wie Tinder für Jobs) gebaut mit:
- **Framework**: React Native (Expo SDK 54.0.0)
- **Plattformen**: iOS & Android
- **Design-Prinzipien**: Apple Human Interface Guidelines + Professional Job-Platform Aesthetics

### App-Konzept
- **Bewerber** swipen durch Jobs
- **Unternehmen** swipen durch Bewerber  
- **Match** → Chat-Funktion
- **Zielgruppe**: Professionelle Karriere-Suchende

---

## 🎨 Design Principles (Apple HIG)

### 1. **Hierarchy** (Visuelle Hierarchie)
- **Primärer Content**: Jobs/Profile sind der Hauptfokus
- **Sekundäre Actions**: Buttons (Like/Dislike) klar erkennbar aber nicht dominant
- **Tertiäre Info**: Metadata (Standort, Firma, etc.) subtil dargestellt
- **Z-Index**: Cards über Background, Modals über Cards, Toasts über alles

### 2. **Harmony** (Harmonie)
- Konsistente Border-Radius (8px, 12px, 16px, 24px)
- Einheitliche Schatten und Elevation
- Smooth Transitions zwischen States
- Respekt vor System-UI (Safe Areas, Status Bar)

### 3. **Consistency** (Konsistenz)
- Gleiche Patterns über die gesamte App
- Wiederverwendbare Components
- Einheitliche Spacing-System (4pt/8pt Grid)
- Konsistente Icon-Familie (SF Symbols / React Native Vector Icons)

---

## 🎨 Color Palette (Professional/Career Focus)

### Primary Colors (LinkedIn/Career.at inspiriert)
```typescript
export const colors = {
  // Primary Brand
  primary: {
    500: '#0A66C2',  // LinkedIn Blue (Main CTA)
    600: '#004182',  // Darker for pressed state
    400: '#378FE9',  // Lighter for hover
  },
  
  // Secondary/Accent
  secondary: {
    500: '#057642',  // Success Green (Match, Approved)
    600: '#045230',  // Darker green
  },
  
  // Neutral/Professional
  neutral: {
    900: '#1C1E21',  // Text Primary
    800: '#2D2F33',  // Text Secondary
    700: '#3E4045',  // Text Tertiary
    600: '#65676B',  // Text Disabled
    500: '#8A8D91',  // Icons
    400: '#B0B3B8',  // Borders
    300: '#CED0D4',  // Dividers
    200: '#E4E6EB',  // Background Secondary
    100: '#F0F2F5',  // Background Tertiary
    50:  '#F7F8FA',  // Background Primary
  },
  
  // Semantic Colors
  success: '#10A37F',    // Match confirmed
  warning: '#F59E0B',    // Pending review
  error:   '#DC2626',    // Reject/Error
  info:    '#3B82F6',    // Information
  
  // System (iOS/Android)
  systemBlue:   '#007AFF',
  systemGreen:  '#34C759',
  systemRed:    '#FF3B30',
  systemYellow: '#FFCC00',
  
  // Backgrounds
  background: {
    primary:   '#FFFFFF',
    secondary: '#F7F8FA',
    tertiary:  '#E4E6EB',
    overlay:   'rgba(0, 0, 0, 0.4)',
  },
  
  // Card Overlay (Swipe Feedback)
  overlay: {
    like:    'rgba(16, 163, 127, 0.15)',
    dislike: 'rgba(220, 38, 38, 0.15)',
  }
};
```

### Dark Mode Support
```typescript
export const darkColors = {
  neutral: {
    900: '#E4E6EB',  // Inverted for dark mode
    50:  '#18191A',
  },
  background: {
    primary:   '#18191A',
    secondary: '#242526',
    tertiary:  '#3A3B3C',
  }
};
```

---

## 📝 Typography (SF Pro / System Fonts)

### Font Family
```typescript
export const fonts = {
  // iOS: SF Pro (system default)
  // Android: Roboto (system default)
  regular: 'System',
  medium:  'System',
  semibold: 'System',
  bold:    'System',
};
```

### Text Styles (iOS Dynamic Type inspired)
```typescript
export const typography = {
  // Headings
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
    letterSpacing: 0.37,
  },
  title1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: 0.36,
  },
  title2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: 0.35,
  },
  title3: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.38,
  },
  
  // Body Text
  body: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: -0.41,
  },
  bodyEmphasized: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: -0.41,
  },
  
  // Supporting Text
  callout: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: -0.32,
  },
  subhead: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: -0.24,
  },
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    letterSpacing: -0.08,
  },
  caption1: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0,
  },
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400',
    letterSpacing: 0.07,
  },
};
```

### Accessibility
- **Dynamic Type**: Support für Größenanpassungen
- **Minimum Touch Target**: 44x44pt (iOS) / 48x48dp (Android)
- **Contrast Ratio**: Mindestens 4.5:1 für Text (WCAG AA)

---

## 🔲 Layout & Spacing

### Spacing System (8pt Grid)
```typescript
export const spacing = {
  xs:   4,   // Tight spacing
  sm:   8,   // Small spacing
  md:   16,  // Standard spacing
  lg:   24,  // Large spacing
  xl:   32,  // Extra large spacing
  xxl:  48,  // Section spacing
  xxxl: 64,  // Major section spacing
};
```

### Screen Margins
```typescript
export const layout = {
  screenPadding: 16,        // Horizontal screen padding
  cardPadding: 16,          // Inside card padding
  sectionSpacing: 24,       // Between sections
  
  // Safe Areas (respektiere System-UI)
  safeAreaTop: true,        // iOS Notch/Dynamic Island
  safeAreaBottom: true,     // iOS Home Indicator
};
```

### Einheitliches Screen-Layout Pattern (IMMER verwenden!)
```typescript
// ✅ KONSISTENTES PATTERN für alle Screens mit Content oben + Buttons unten

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg, // 24px
    justifyContent: 'space-between', // ← WICHTIG: Verteilt Top/Bottom Content
  },
  
  // Top Section (Header, Logo, Inputs, etc.)
  topSection: {
    paddingTop: theme.spacing.xxxl, // 64px - Nach oben schieben
    // KEIN flex: 1 - wächst nur so viel wie Content braucht
  },
  
  // Bottom Section (CTA Buttons auf Daumenhöhe)
  bottomSection: {
    paddingBottom: Platform.OS === 'ios' 
      ? theme.spacing.lg   // 24px iOS
      : theme.spacing.xl,  // 32px Android (höherer Home Button)
    gap: theme.spacing.md, // 16px zwischen Buttons
    // KEIN flex: 1 - bleibt am Bottom durch space-between
  },
  
  button: {
    minHeight: 56, // Touch-Target (iOS: 44pt minimum, wir nutzen 56 für bessere Usability)
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// ❌ NICHT VERWENDEN:
// - Feste Höhen in Containern (height: 200) → nur in direkten Button/Card Komponenten
// - flex: 1 in topSection → verhindert richtige Positionierung
// - marginTop auf Buttons → spacing wird durch gap/paddingBottom kontrolliert
// - justifyContent: 'center' wenn Buttons am Bottom sein sollen → immer 'space-between'
```

### Border Radius
```typescript
export const borderRadius = {
  sm:  4,   // Small elements
  md:  8,   // Buttons, inputs
  lg:  12,  // Cards
  xl:  16,  // Modals, sheets
  xxl: 24,  // Main swipe cards
  full: 9999, // Pills, circular buttons
};
```

---

## 🎯 Components Guidelines

### 1. **Swipe Cards** (Hauptkomponente)

#### Design
- **Size**: Fullscreen minus top/bottom safe areas
- **Padding**: 24px von Screen-Edges
- **Border Radius**: 24px
- **Shadow**: Elevation 8 (0 8px 16px rgba(0,0,0,0.1))
- **Background**: White (Light) / #242526 (Dark)

#### Swipe Gestures
- **Pan Gesture**: Native feel mit Federdämpfung
- **Velocity Threshold**: >0.5 für Auto-Dismiss
- **Rotation**: Leichte Rotation während Swipe (max 15°)
- **Visual Feedback**: 
  - Links: Rote Overlay (10% opacity)
  - Rechts: Grüne Overlay (10% opacity)

#### Card Content Structure
```
┌─────────────────────────────────┐
│  [Company Logo]                 │ ← 60x60, top-right
│                                 │
│  Job Title (Title2, Bold)       │
│  Company Name (Body, Medium)    │
│  Location • Salary Range        │ ← Caption1, Gray
│                                 │
│  ─────────────────              │ ← Divider
│                                 │
│  Key Requirements (max 3)       │
│  • Requirement 1                │
│  • Requirement 2                │
│  • Requirement 3                │
│                                 │
│  ─────────────────              │
│                                 │
│  Job Description (truncated)    │
│  Read more...                   │
│                                 │
└─────────────────────────────────┘
```

### 2. **Buttons**

#### Primary Button (CTA)
```typescript
{
  backgroundColor: colors.primary[500],
  borderRadius: borderRadius.md,
  paddingVertical: 14,
  paddingHorizontal: 24,
  minHeight: 44, // Touch target
  
  // States
  hover: { backgroundColor: colors.primary[400] },
  pressed: { 
    backgroundColor: colors.primary[600],
    scale: 0.97,
  },
  disabled: {
    backgroundColor: colors.neutral[300],
    opacity: 0.5,
  }
}
```

#### Secondary Button
```typescript
{
  backgroundColor: 'transparent',
  borderWidth: 1.5,
  borderColor: colors.primary[500],
  color: colors.primary[500],
  // Rest same as primary
}
```

#### Icon Buttons (Swipe Actions)
```typescript
{
  width: 64,
  height: 64,
  borderRadius: borderRadius.full,
  backgroundColor: colors.background.primary,
  shadowRadius: 8,
  
  // Icons
  like: { color: colors.success },
  dislike: { color: colors.error },
  superlike: { color: colors.systemBlue },
}
```

### 3. **Navigation**

#### Tab Bar (Bottom Navigation)
- **Height**: 64px + Safe Area Bottom
- **Items**: 4-5 maximum
- **Active State**: Primary Color + Bold Label
- **Inactive State**: Neutral 500
- **Icons**: 24x24pt
- **Labels**: Caption1 (12pt)

#### Stack Navigation
- **Header**: 
  - Height: 44px + Safe Area Top
  - Title: Title3 (20pt, Semibold)
  - Back Button: Chevron-left + "Back" text
  - Background: Blurred (iOS style)

### 4. **Match Modal** (Konfetti-Effekt)

```typescript
{
  // Full-Screen Overlay
  backgroundColor: 'rgba(0,0,0,0.85)',
  justifyContent: 'center',
  alignItems: 'center',
  
  // Content
  children: [
    <Confetti />,  // Animation
    <MatchIcon />, // Green checkmark, 120x120
    <Text style={title1}>It's a Match!</Text>,
    <ProfilePreviews />, // Beide Profile nebeneinander
    <PrimaryButton>Send Message</PrimaryButton>,
    <TextButton>Keep Swiping</TextButton>,
  ]
}
```

### 5. **Chat Interface**

#### Message Bubble
```typescript
{
  // Sent (right aligned)
  sent: {
    backgroundColor: colors.primary[500],
    color: '#FFFFFF',
    borderRadius: [16, 16, 4, 16], // Top-right sharp
    marginLeft: 64, // Max width constraint
    alignSelf: 'flex-end',
  },
  
  // Received (left aligned)
  received: {
    backgroundColor: colors.neutral[200],
    color: colors.neutral[900],
    borderRadius: [16, 16, 16, 4], // Bottom-left sharp
    marginRight: 64,
    alignSelf: 'flex-start',
  }
}
```

### 6. **Profile Components**

#### Avatar
- **Sizes**: 32, 40, 48, 64, 120
- **Border**: 2px white border für Overlays
- **Fallback**: Initials mit gradient background

#### Status Badge
```typescript
{
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 12,
  height: 12,
  borderRadius: 6,
  borderWidth: 2,
  borderColor: colors.background.primary,
  
  // States
  online: { backgroundColor: colors.systemGreen },
  offline: { backgroundColor: colors.neutral[400] },
  away: { backgroundColor: colors.systemYellow },
}
```

---

## 🎬 Animations & Motion

### Timing Functions (iOS Bezier Curves)
```typescript
export const animations = {
  // Standard iOS curves
  easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
  easeOut:   'cubic-bezier(0, 0, 0.58, 1)',
  easeIn:    'cubic-bezier(0.42, 0, 1, 1)',
  
  // Spring (React Native Animated)
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  
  // Durations
  fast:     200,  // Micro-interactions
  normal:   300,  // Standard transitions
  slow:     500,  // Complex animations
};
```

### Key Animations
1. **Card Swipe**: Spring animation mit rotation
2. **Button Press**: Scale 0.97, 100ms
3. **Modal Present**: Slide up + fade in, 300ms
4. **Match Confetti**: 2s celebration
5. **Tab Switch**: Cross-fade, 200ms
6. **Loading**: Spinner rotation 1s infinite

---

## ♿️ Accessibility (WCAG 2.1 AA)

### Requirements
- ✅ **VoiceOver/TalkBack** Support für alle interaktiven Elemente
- ✅ **Dynamic Type** unterstützt (120% - 200%)
- ✅ **Contrast Ratios**: Text 4.5:1, Large Text 3:1
- ✅ **Touch Targets**: Minimum 44x44pt
- ✅ **Screen Reader Labels**: Alle Buttons, Icons, Images
- ✅ **Keyboard Navigation**: Für Android TV/Web
- ✅ **Reduce Motion**: Respektiere System-Einstellungen

### Implementation
```typescript
// Accessibility Props
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Like this job"
  accessibilityHint="Double tap to express interest"
  accessibilityRole="button"
  accessibilityState={{ disabled: false }}
>
```

---

## 📱 Platform-Specific Considerations

### iOS
- Respektiere **Safe Area** (Notch, Dynamic Island, Home Indicator)
- **Haptic Feedback** bei wichtigen Actions
- **SF Symbols** für System Icons
- **Navigation**: iOS-style gestures (swipe from left edge)

### Android
- **Material Ripple Effects** auf Buttons
- **System Navigation**: Back button handling
- **Status Bar**: Transparent mit Color Overlay
- **FAB** optional für Hauptaktion

---

## 🎯 Inspiration & References

### Apps zum Studieren
- **Tinder**: Card-Swipe-Mechanik, Match-Animation
- **Bumble**: Professional UI, Filter-System
- **Hinge**: Profile-Details, Conversation-Starters
- **LinkedIn**: Color Palette, Professional Tone
- **Airbnb**: Clean Layout, Spacing, Photos

### Design Resources
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [Material Design 3](https://m3.material.io/)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

---

## 🛠️ Expo SDK 54.0.0 Packages

### Empfohlene Libraries
```json
{
  "expo": "^54.0.0",
  "react-native": "latest",
  
  // UI/Animations
  "react-native-reanimated": "latest",
  "react-native-gesture-handler": "latest",
  "react-native-svg": "latest",
  
  // Navigation
  "@react-navigation/native": "latest",
  "@react-navigation/stack": "latest",
  "@react-navigation/bottom-tabs": "latest",
  
  // Icons
  "@expo/vector-icons": "latest",
  
  // Utilities
  "expo-haptics": "latest",
  "expo-blur": "latest",
  "expo-linear-gradient": "latest"
}
```

---

## 📋 Component Checklist

Bei der Entwicklung von Components IMMER beachten:

- [ ] Verwendet definierte Colors aus Theme
- [ ] Typography styles konsistent
- [ ] Spacing basiert auf 8pt Grid
- [ ] Touch targets min. 44x44pt
- [ ] Accessibility labels vorhanden
- [ ] Dark Mode Support
- [ ] Loading/Error States implementiert
- [ ] Animations smooth (60fps)
- [ ] Safe Area respektiert
- [ ] Platform-specific Code wenn nötig

---

## 🎨 Design Tokens Export

```typescript
// theme.ts - Zentrales Theme File
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
};

// Usage
import { theme } from '@/theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary[500],
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  }
});
```

---


## 🎨 Software Architektur & Prinzipien
- SOLID Principles
- IMMER best practice
- Habe immer das große Ganze im Blick
- sauberen, effizienten Code schreiben!
- klare Trennung von Logik und UI
- standartisierte Nomenklatur bei Variablen/Methoden usw. (z.B. camelCase für Variablen, PascalCase für Komponenten) und nicht einmal Deutsch einmal Englisch oder so. Und verständlich benennen!
- IMMER einheitliche Patterns, keine Inkonstistenzen. Zum Beispiel: Button auf Daumenhöhe: einmal dynamisch, einmal feste Höhe -> nein beide dynamisch!
- DRY (Don't Repeat Yourself)
- Saubere Ordnerstruktur!
- Du schreibst Code für Menschen nicht für Maschinen!
- Schreibe Kommentare wo nötig, aber nicht zu viel. Klarer Code braucht weniger Kommentare.
- Vermeide unnötige Komplexität. Halte den Code so einfach wie möglich.
- Löse Probleme auf die eleganteste Weise.
- Wenn Probleme auftreten, ist es keine Lösung, einfach "quick fixes" zu machen. Finde die Wurzel des Problems und behebe es richtig. Zum Beispiel: Wenn eine Fehlermeldung erscheint, ist es keine Lösung, einfach die Fehlermeldung zu unterdrücken. Finde heraus, warum sie auftritt und behebe das Problem an der Quelle.
- Wenn etwas nicht funnktioniert, suche nach der Ursache und behebe sie, anstatt nur die Symptome zu behandeln. Außerdem ist es keine Lösung den Code der nicht funktioniert zu ignorieren und stattdessen neuen Code zu schreiben.
- Erstelle wiederverwendbare UI-Komponenten (wie Buttons, Text, Input-Felder, Cards, Avatars, Error, Success... und so weiter), Styles, Variants die einfach importiert und genutzt werden können, damit nichts neu definiert werden muss
- Versuche immer vorauszuplanen, was in der Zukunft benötigt wird, und baue es von Anfang an richtig auf, anstatt später alles umzubauen und zu refactoren. Analogie: Alle nötigen Samen für einen Garten von Anfang an pflanzen, anstatt später alles neu zu bepflanzen.
- Improvisiere nicht. Wenn ich dir einen Prompt und eine Aufgabe gebe, halte dich genau daran und improvisiere nicht, indem du einfach Funktionen, Dinge einbaust die nicht verlangt worden sind. Wenn du etwas nicht verstehst, frage nach, anstatt es zu erraten oder zu improvisieren.
- Vermeide unbedingt Quick Fixes und Workarounds. Diese führen nur zu technischem Schulden und zukünftigen Problemen.
- Arbeite langsam und sorgfältig, nicht schnell und schlampig. Qualität über Quantität. Wir haben Zeit, also nutze sie weise. Nimm immer einen tiefen Atemzug bevor du mit der Arbeit beginnst, um dich zu fokussieren und klar zu denken.
- Mach dir immer zuerst ein Bild was die Aufgabe ist, was du vor hast, dann fang an zu coden.
- Bitte mach eine saubere logische übersichtliche Ordnerstruktur, keine unübersichtlichen Strukturen wo alles durcheinander ist. Halte dich an bewährte Strukturen für React Native/Expo Projekte. Ich lege Wert auf Ordnung und Struktur. Ich hasse Chaos!
- Gib Variablen, Funktionen, Komponenten immer klare, verständliche Namen. Keine Abkürzungen oder unverständlichen Begriffe.
- Ich bin dein Chef. Was ich sage, ist Gesetz. Befolge meine Anweisungen genau so, wie ich sie gebe. Wenn du etwas nicht verstehst, frage nach, anstatt es zu erraten oder zu improvisieren.

----

**Letzte Aktualisierung**: 29. Oktober 2025  
**Expo SDK Version**: 54.0.0  
**Maintainer**: Luan @ Swipi
