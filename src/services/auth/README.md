# Auth Service

Zentrale Business-Logik für Authentication.

## Architektur

```
RoleContext (State)
    ↓
AuthService (Business Logic)
    ↓
auth.mocks (MVP Data Layer)
```

### Prinzipien
- ✅ **Single Responsibility**: Nur Auth-Logik (keine Storage, keine State)
- ✅ **Stateless**: Keine Hidden Dependencies (kein `useRole()`)
- ✅ **Dependency Inversion**: Context nutzt Service-Interface

---

## Dateien

| Datei | Beschreibung |
|-------|-------------|
| `AuthService.ts` | **MVP-Implementation** (Mock-Calls) |
| `AuthService.prod.ts` | **Production-Implementation** (echte API-Calls) |
| `auth.types.ts` | TypeScript-Interfaces |
| `auth.mocks.ts` | Mock-Daten für MVP |

---

## MVP → Production Migration

### Schritt 1: Backend-API bereitstellen

Stelle sicher, dass folgende Endpoints existieren:

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

**Erwartete Request/Response:**

```typescript
// Login
POST /api/auth/login
{ email: string, password: string }
→ { token: string, user: { id, email, role, onboardingComplete } }

// Register
POST /api/auth/register
{ email: string, password: string, role: 'BEWERBER' | 'FIRMA' }
→ { token: string, user: { id, email, role, onboardingComplete: false } }

// Logout
POST /api/auth/logout
Headers: { Authorization: 'Bearer <token>' }
→ 200 OK
```

### Schritt 2: Code austauschen

```powershell
# 1. Backup erstellen
Copy-Item src/services/auth/AuthService.ts src/services/auth/AuthService.backup.ts

# 2. Production-Version aktivieren
Remove-Item src/services/auth/AuthService.ts
Rename-Item src/services/auth/AuthService.prod.ts AuthService.ts

# 3. Mocks entfernen (optional)
Remove-Item src/services/auth/auth.mocks.ts
```

### Schritt 3: Testen

```typescript
// RoleContext nutzt AuthService identisch
const response = await AuthService.login(email, password);
// Kein Code-Change nötig! ✅
```

---

## Flow: User Registration

```
1. RoleSelectionScreen
   → User wählt Rolle (BEWERBER | FIRMA)
   → setRole(role) in Context

2. RegisterScreen
   → User gibt Email/Password ein
   → AuthService.register(email, password, role)
   → Context setzt Token + User

3. OnboardingDataScreen
   → User gibt restliche Daten ein
   → saveUserData() in Context
   → onboardingComplete = true
```

**Warum `role` als Parameter?**
→ Service ist **stateless** (kein `useRole()`)
→ Context übergibt explizit die gewählte Rolle

---

## Troubleshooting

### "Role required" Error beim Register

**Problem:** `role` ist `null` oder `undefined`

**Lösung:** RoleSelectionScreen muss `setRole()` aufrufen **bevor** RegisterScreen

```typescript
// RoleSelectionScreen.tsx
const handleRoleSelect = (selectedRole: UserRole) => {
  setRole(selectedRole); // ← WICHTIG
  navigation.navigate('Register');
};
```

### Login gibt immer Role "BEWERBER"

**Normal in MVP!** Mock-Implementation gibt hardcoded `'BEWERBER'` zurück.

**Production:** Backend gibt echte User-Role zurück.

---

## Best Practices

### ❌ NICHT:
```typescript
// Service sollte KEINEN Context nutzen
const { role } = useRole(); // ← Verletzt Stateless-Prinzip
```

### ✅ RICHTIG:
```typescript
// Context übergibt role explizit
await AuthService.register(email, password, role);
```

---

## API Error Handling

Production-Version wirft spezifische Errors:

```typescript
try {
  await AuthService.login(email, password);
} catch (error) {
  if (error.message.includes('credentials')) {
    // Falsche Email/Password
  } else if (error.message.includes('already in use')) {
    // Email bereits registriert
  }
}
```
