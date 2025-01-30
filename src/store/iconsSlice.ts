import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export type IconData = {
  id: number;
  iconName: string;
  iconImage: string;
  things: { id: number; name: string; quantity: number }[];
};

type BagItem = {
  bagId: number;
  icon: IconData;
};

type IconsState = {
  iconList: IconData[];
  bagList: BagItem[];
};

const initialState: IconsState = {
  iconList: [],
  bagList: [],
};

export const iconsSlice = createSlice({
  name: "icons",
  initialState,
  reducers: {
    addIcon: (state, action: PayloadAction<IconData>) => {
      state.iconList.push(action.payload);
    },
    removeIcon: (state, action: PayloadAction<number>) => {
      state.iconList = state.iconList.filter((icon) => icon.id !== action.payload);
    },
    moveIconToBag: (state, action: PayloadAction<{ iconId: number; bagId: number }>) => {
      const { iconId, bagId } = action.payload;
      const iconIndex = state.iconList.findIndex((icon) => icon.id === iconId);
      if (iconIndex !== -1) {
        const icon = state.iconList[iconIndex];
        state.bagList.push({ bagId, icon });
        state.iconList.splice(iconIndex, 1);
      }
    },
  },
});

export const { addIcon, removeIcon, moveIconToBag } = iconsSlice.actions;
export default iconsSlice.reducer;

/**
 * 例: バッグ1のアイコン数を取得したい場合
 *    const bag1Count = useSelector((state) => selectBagCount(state, 1));
 */
export const selectBagCount = (state: RootState, bagId: number): number => {
  return state.icons.bagList.filter((item) => item.bagId === bagId).length;
};
