import { Resource } from "@models/Resource";
import { ResourceType } from "@models/ResourceType";
import { StandardProjectType } from "@models/StandardProjectType";
import { createSlice, } from "@reduxjs/toolkit";

export type Resources = Record<keyof typeof ResourceType, Resource>

const initialResources: Resources = {
  "CREDIT": {
    current: 20,
    production: 1,
    min: -5,
  },
  "STEEL": {
    current: 0,
    production: 1,
    min: 0,
  },
  "TITANIUM": {
    current: 0,
    production: 1,
    min: 0,
  },
  "PLANTS": {
    current: 0,
    production: 1,
    min: 0,
  },
  "ENERGY": {
    current: 0,
    production: 1,
    min: 0,
  },
  "HEAT": {
    current: 0,
    production: 1,
    min: 0,
  }
}

export const resourceSlice = createSlice({
  name: 'resources',
  initialState: initialResources,
  reducers: {
    adjustProductionAmount: (state, action) => {
      const type = action.payload.resourceType as keyof typeof ResourceType;
      const newProductionAmount = state[type].production + action.payload.amount;
      state[type] = { ...state[type], production: newProductionAmount > state[type].min ? newProductionAmount : state[type].min };
    },
    adjustCurrentAmount: (state, action) => {
      const type = action.payload.resourceType as keyof typeof ResourceType;
      const newCurrentAmount = state[type].current + action.payload.amount;
      state[type] = { ...state[type], current: newCurrentAmount > 0 ? newCurrentAmount : 0 };
    },
    research: (state, action) => {
      state["CREDIT"] = { ...state["CREDIT"], current: state["CREDIT"].current - (action.payload.purchasedCards * 3) };
    },
    getGreenery: (state) => {
      state["PLANTS"] = { ...state["PLANTS"], current: state["PLANTS"].current - 8 };
    },
    increaseTemperature: (state) => {
      state["HEAT"] = { ...state["HEAT"], current: state["HEAT"].current - 8 };
    },
    claimMilestone: (state) => {
      state["CREDIT"] = { ...state["CREDIT"], current: state["CREDIT"].current - 8 };
    },
    production: (state, action) => {
      const newCreditAmount = state["CREDIT"].current + state["CREDIT"].production + action.payload.rank;
      state["CREDIT"] = { ...state["CREDIT"], current: newCreditAmount >= 0 ? newCreditAmount : 0 };
      state["STEEL"] = { ...state["STEEL"], current: state["STEEL"].current + state["STEEL"].production };
      state["TITANIUM"] = { ...state["TITANIUM"], current: state["TITANIUM"].current + state["TITANIUM"].production };
      state["PLANTS"] = { ...state["PLANTS"], current: state["PLANTS"].current + state["PLANTS"].production };
      state["HEAT"] = { ...state["HEAT"], current: state["HEAT"].current + state["ENERGY"].current + state["HEAT"].production };
      state["ENERGY"] = { ...state["ENERGY"], current: state["ENERGY"].production };
    },
    playCard: (state, action) => {
      Object.keys(ResourceType).map((item) => {
        const key = item as keyof typeof ResourceType;
        state[key] = { 
          ...action.payload.newResourcesValues[key], 
          production: action.payload.newResourcesValues[key].production > state[key].min ? action.payload.newResourcesValues[key].production : state[key].min }
      });
    },
    fundAward: (state, action) => {
      state["CREDIT"] = { ...state["CREDIT"], current: state["CREDIT"].current - action.payload.amount };
    },
    standardProject: (state, action) => {
      if (action.payload.type === StandardProjectType.SELL_PATENT) {
        state["CREDIT"] = { ...state["CREDIT"], current: state["CREDIT"].current + (action.payload.amount as number) };
        return;
      }
      if (action.payload.type === StandardProjectType.POWER_PLANT) {
        state["CREDIT"] = { ...state["CREDIT"], current: state["CREDIT"].current - 11 };
        state["ENERGY"] = { ...state["ENERGY"], current: state["ENERGY"].current + 1 };
        return;
      }
      if (action.payload.type === StandardProjectType.ASTEROID) {
        // Bump rank by 1
        state["CREDIT"] = { ...state["CREDIT"], current: state["CREDIT"].current - 14 };
        return;
      }
      if (action.payload.type === StandardProjectType.AQUIFER) {
        // Bump rank by 1
        // Open placement bonus popup
        state["CREDIT"] = { ...state["CREDIT"], current: state["CREDIT"].current - 18 };
        return;
      }
      if (action.payload.type === StandardProjectType.GREENERY) {
        // Bump rank by 1
        // Open placement bonus popup
        state["CREDIT"] = { ...state["CREDIT"], current: state["CREDIT"].current - 23 };
        return;
      }
      if (action.payload.type === StandardProjectType.CITY) {
        // Open placement bonus popup
        state["CREDIT"] = { ...state["CREDIT"], current: state["CREDIT"].current - 25 };
        state["CREDIT"] = { ...state["CREDIT"], production: state["CREDIT"].production + 1 };
        return;
      }
    }
  },
});

export const { adjustProductionAmount, adjustCurrentAmount, production, research, getGreenery, increaseTemperature, claimMilestone, playCard, standardProject, fundAward } = resourceSlice.actions;
export default resourceSlice.reducer;