## Architektur-Prinzipien

**SOLID:**
- Single Responsibility: Eine Component/Funktion = eine Aufgabe
- Open/Closed: Erweiterbar über Props, nicht änderbar
- Liskov: Components mit gleichen Props austauschbar
- Interface Segregation: Keine überladenen Props (lieber mehrere kleine Components)
- Dependency Inversion: Hooks/Services nutzen, keine Business-Logik in UI

**DRY + Component-First:**
Prüfe IMMER vor dem Coden:
1. Gibt es bereits eine Component, Hook, Funktion oder Theme-Wert?
2. Wenn ja → nutze sie.
3. Wenn nein → baue sie wiederverwendbar (nicht screen-spezifisch).
4. NIEMALS Duplikate erstellen (kein Hardcoding von Colors, Spacing, Border Radius, keine duplizierten Components/Hooks/Funktionen).

**Wiederverwendbare Logik:**
Erstelle Custom Hooks (API-Calls, State), Helper-Funktionen (Validierung, Formatierung), Services (Business-Logik). Duplikation verboten.

## Screen-Layout Pattern (PFLICHT)
- Container: `flex: 1`
- Content: `flex: 1, justifyContent: 'space-between'`
- VERBOTEN: Feste Höhen, `flex: 1` in topSection, `marginTop` auf Buttons

## Qualität & Vorgehen
- Root-Cause finden, keine Workarounds
- Kein Raten ("wahrscheinlich", "vielleicht") – nur Fakten
- Langsam & sorgfältig arbeiten (Qualität > Tempo)
- Bei Unklarheit fragen, nicht improvisieren
- Codebase gründlich analysieren vor Änderungen

## 🔥 ZUSAMMENFASSUNG (DIE 5 WICHTIGSTEN REGELN)

1. **Component-First**: Prüfe IMMER: Gibt es bereits eine Component, Hook, Funktion oder Theme-Wert? Nutze sie. Keine Duplikate.
2. **DRY**: NIEMALS Hardcoding (Colors, Spacing, Border Radius) oder duplizierte Components/Hooks/Funktionen.
3. **SOLID**: Eine Component/Funktion = eine Aufgabe. Erweiterbar, austauschbar, keine überladenen Props, keine Business-Logik in UI.
4. **Root-Cause > Quick Fix**: Keine Workarounds – Ursache finden.
5. **Kein Raten**: Bei Unklarheit fragen. Nur Fakten.