# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Installation**: `npm install`
- **Development server**: `npm run dev` (runs with service worker enabled via SW_DEV=true)
- **Production build**: `npm run build` (includes TypeScript check with `tsc --noemit`)
- **Build preview**: `npm run preview`
- **Linting**: `npm run lint` or `npm run lint:fix` (includes Prettier formatting)
- **Type checking**: `tsc --noemit` (included automatically in build)

## Testing

This project uses Jest with React Testing Library but currently has no test files. Testing setup is configured via `src/setupTests.ts`.

## Architecture Overview

This is a React/TypeScript mathematical function visualization tool (dgraph) that renders arbitrary real number functions f(x) on HTML5 canvas.

### Core Architecture Pattern
The application uses a **modular dependency injection pattern** centered around a main controller (`src/container.ts`) that orchestrates five specialized modules:

- **Controller**: Main orchestrator that coordinates updates and rendering
- **Simulator**: Evaluates mathematical expressions using `math-expression-evaluator`
- **Visualizer**: Generates colors for data points based on drawing settings
- **Snapshots**: Manages simulation data and coordinates between simulator/visualizer
- **Drawer**: Handles canvas rendering operations

### State Management
Uses **Jotai** for atomic state management. The main state is managed in `src/hooks/simulationState.ts` with a single atom containing:
- `setting`: Current chart configuration (equation, axis bounds, appearance)
- `error`: Error state from simulation
- `isLoading`: Loading state during async operations

### Key Data Flow
1. User inputs mathematical equation via `SettingForm`
2. State update triggers `controller.update()` via `updateSimulationState`
3. Controller determines update action (UpdateAll/UpdateSimulation/UpdateAppearance/None)
4. Simulator evaluates equation across x-range producing Value[] points
5. Visualizer generates colors for each point based on drawing pattern
6. Snapshots stores combined data points with colors
7. Canvas component renders via `controller.draw()`

### Module Interfaces
Each module follows interface-based design in `src/modules/*/interface.ts`. The Controller interface defines the main contract:
```typescript
interface IController {
  update(setting: ChartSetting, PrevSetting: ChartSetting): Promise<void>;
  draw(context: CanvasRenderingContext2D, setting: ChartSetting, canvasWidth: number, canvasHeight: number): void;
}
```

### Configuration
- Supports both orthogonal and polar coordinate systems
- Default equation: `2(sin(5.01x) + cos(4.99x))sin(10x)`
- Settings can be passed via URL query parameter (base64 encoded JSON)
- PWA-enabled with manifest configuration for standalone mobile app
- Uses Vite for bundling with React plugin and PWA support
- Build output goes to `build/` directory (not `dist/`)

### Key Technologies
- **React 19** with TypeScript for UI
- **Jotai** for atomic state management
- **Formik** for form handling
- **math-expression-evaluator** for parsing mathematical expressions
- **Vite** with PWA plugin for development and building
- **ESLint + Prettier** for code quality

### Module Dependencies
The dependency injection container (`src/container.ts`) instantiates modules in this order:
1. Visualizer (standalone)
2. Simulator (standalone) 
3. Snapshots (depends on Simulator + Visualizer)
4. Drawer (standalone)
5. Controller (depends on Snapshots + Drawer)