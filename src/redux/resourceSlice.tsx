import { Resource } from "@models/Resource";
import { ResourceType } from "@models/ResourceType";
import { StandardProjectType } from "@models/StandardProjectType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialResources: Resources = {
  CREDIT: {
    current: 20,
    production: 1,
    min: -5,
  },
  STEEL: {
    current: 0,
    production: 1,
    min: 0,
  },
  TITANIUM: {
    current: 0,
    production: 1,
    min: 0,
  },
  PLANTS: {
    current: 0,
    production: 1,
    min: 0,
  },
  ENERGY: {
    current: 0,
    production: 1,
    min: 0,
  },
  HEAT: {
    current: 0,
    production: 1,
    min: 0,
  },
};

export const resourceSlice = createSlice({
  name: "resources",
  initialState: initialResources,
  reducers: {
    adjustProductionAmount: (
      state,
      action: PayloadAction<PayloadResourceSingle>,
    ) => {
      const type = action.payload.resourceType;
      const newProductionAmount =
        state[type].production + action.payload.amount;
      state[type] = {
        ...state[type],
        production:
          newProductionAmount > state[type].min
            ? newProductionAmount
            : state[type].min,
      };
    },
    adjustCurrentAmount: (
      state,
      action: PayloadAction<PayloadResourceSingle>,
    ) => {
      const type = action.payload.resourceType;
      const newCurrentAmount = state[type].current + action.payload.amount;
      state[type] = {
        ...state[type],
        current: newCurrentAmount > 0 ? newCurrentAmount : 0,
      };
    },
    research: (state, action: PayloadAction<PayloadResearch>) => {
      state["CREDIT"] = {
        ...state["CREDIT"],
        current: state["CREDIT"].current - action.payload.purchasedCards * 3,
      };
    },
    getGreenery: (state) => {
      state["PLANTS"] = {
        ...state["PLANTS"],
        current: state["PLANTS"].current - 8,
      };
    },
    increaseTemperature: (state) => {
      state["HEAT"] = { ...state["HEAT"], current: state["HEAT"].current - 8 };
    },
    claimMilestone: (state) => {
      state["CREDIT"] = {
        ...state["CREDIT"],
        current: state["CREDIT"].current - 8,
      };
    },
    production: (state, action: PayloadAction<PayloadRank>) => {
      const newCreditAmount =
        state["CREDIT"].current +
        state["CREDIT"].production +
        action.payload.rank;
      state["CREDIT"] = {
        ...state["CREDIT"],
        current: newCreditAmount >= 0 ? newCreditAmount : 0,
      };
      state["STEEL"] = {
        ...state["STEEL"],
        current: state["STEEL"].current + state["STEEL"].production,
      };
      state["TITANIUM"] = {
        ...state["TITANIUM"],
        current: state["TITANIUM"].current + state["TITANIUM"].production,
      };
      state["PLANTS"] = {
        ...state["PLANTS"],
        current: state["PLANTS"].current + state["PLANTS"].production,
      };
      state["HEAT"] = {
        ...state["HEAT"],
        current:
          state["HEAT"].current +
          state["ENERGY"].current +
          state["HEAT"].production,
      };
      state["ENERGY"] = {
        ...state["ENERGY"],
        current: state["ENERGY"].production,
      };
    },
    playCard: (state, action: PayloadAction<PayloadResourceBatch>) => {
      Object.keys(ResourceType).map((item) => {
        const key = item as keyof typeof ResourceType;
        state[key] = {
          ...action.payload.newResourcesValues[key],
          production:
            action.payload.newResourcesValues[key].production > state[key].min
              ? action.payload.newResourcesValues[key].production
              : state[key].min,
        };
      });
    },
    fundAward: (state, action: PayloadAction<PayloadResourceSingle>) => {
      state["CREDIT"] = {
        ...state["CREDIT"],
        current: state["CREDIT"].current - action.payload.amount,
      };
    },
    standardProject: (state, action: PayloadAction<PayloadStandardProject>) => {
      if (action.payload.type === StandardProjectType.SELL_PATENT) {
        state["CREDIT"] = {
          ...state["CREDIT"],
          current:
            state["CREDIT"].current +
            (action.payload.amount ? action.payload.amount : 0),
        };
        return;
      }
      if (action.payload.type === StandardProjectType.POWER_PLANT) {
        state["CREDIT"] = {
          ...state["CREDIT"],
          current: state["CREDIT"].current - 11,
        };
        state["ENERGY"] = {
          ...state["ENERGY"],
          current: state["ENERGY"].current + 1,
        };
        return;
      }
      if (action.payload.type === StandardProjectType.ASTEROID) {
        // Bump rank by 1
        state["CREDIT"] = {
          ...state["CREDIT"],
          current: state["CREDIT"].current - 14,
        };
        return;
      }
      if (action.payload.type === StandardProjectType.AQUIFER) {
        // Bump rank by 1
        // Open placement bonus popup
        state["CREDIT"] = {
          ...state["CREDIT"],
          current: state["CREDIT"].current - 18,
        };
        return;
      }
      if (action.payload.type === StandardProjectType.GREENERY) {
        // Bump rank by 1
        // Open placement bonus popup
        state["CREDIT"] = {
          ...state["CREDIT"],
          current: state["CREDIT"].current - 23,
        };
        return;
      }
      if (action.payload.type === StandardProjectType.CITY) {
        // Open placement bonus popup
        state["CREDIT"] = {
          ...state["CREDIT"],
          current: state["CREDIT"].current - 25,
        };
        state["CREDIT"] = {
          ...state["CREDIT"],
          production: state["CREDIT"].production + 1,
        };
      }
    },
  },
});

export const {
  adjustProductionAmount,
  adjustCurrentAmount,
  production,
  research,
  getGreenery,
  increaseTemperature,
  claimMilestone,
  playCard,
  standardProject,
  fundAward,
} = resourceSlice.actions;
export default resourceSlice.reducer;

export type Resources = Record<keyof typeof ResourceType, Resource>;

interface PayloadResourceSingle {
  resourceType: keyof typeof ResourceType;
  amount: number;
}

interface PayloadResourceBatch {
  newResourcesValues: Resources;
}

interface PayloadResearch {
  purchasedCards: number;
}

interface PayloadStandardProject {
  type: StandardProjectType | null;
  amount?: number;
}

interface PayloadRank {
  rank: number;
}
