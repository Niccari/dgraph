import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { controller } from "../../container";
import { ChartSetting, Coordinate } from "../../models";
import { ColorPattern } from "../../modules/colorGenerator/interface";

// state
export enum SimulatingState {
  Loading,
  Completed,
  Error,
}

export interface State {
  simulatingState: SimulatingState;
  setting: ChartSetting;
}

export const defaultState: State = {
  simulatingState: SimulatingState.Completed,
  setting: {
    equation: "2(sin(5.01x) + cos(4.99x))sin(10x)",
    axis: {
      xStep: 0.001,
      xMin: -Math.PI,
      xMax: Math.PI,
      yMin: -Math.PI,
      yMax: Math.PI,
    },
    coordinate: Coordinate.Polar,
    chartAppearance: {
      draw: {
        pattern: ColorPattern.Rainbow,
        colorStep: 256 / ((2 * Math.PI) / 0.001),
      },
      thickness: 5,
    },
  },
};

const initialSetting = ((): ChartSetting => {
  const query = new URL(document.location.href).searchParams;
  const settingQuery = query.get("setting") || "";
  try {
    return JSON.parse(atob(settingQuery));
  } catch (e) {
    return defaultState.setting;
  }
})();

export const initialState = {
  ...defaultState,
  setting: initialSetting,
};

// actionCreator
export interface SimulateAsyncSetting {
  setting: ChartSetting;
  prevSetting: ChartSetting;
}

export const simulateAsync = createAsyncThunk(
  "simulation/simulateAsync",
  async (settings: SimulateAsyncSetting): Promise<ChartSetting> => {
    const { setting, prevSetting } = settings;
    await controller.update(setting, prevSetting).catch((e) => {
      return Promise.reject(e);
    });
    return settings.setting;
  }
);

// slice
const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {},
  extraReducers: {
    [simulateAsync.pending.toString()]: (state) => {
      return {
        ...state,
        simulatingState: SimulatingState.Loading,
      };
    },
    [simulateAsync.rejected.toString()]: (state) => {
      return {
        ...state,
        simulatingState: SimulatingState.Error,
      };
    },
    [simulateAsync.fulfilled.toString()]: (state, action: PayloadAction<ChartSetting>) => {
      const chartSetting = action.payload;
      return {
        ...state,
        setting: chartSetting,
        simulatingState: SimulatingState.Completed,
      };
    },
  },
});

// reducer
export default simulationSlice.reducer;
