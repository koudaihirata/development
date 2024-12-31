// src/store/iconsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// アイコン1つ分のデータ
export type IconData = {
  id: number;
  iconName: string;
  iconImage: string;
  things: { id: number; name: string; quantity: number }[];
};

// Slice の state の構造
type IconsState = {
  // まだ画面上にあるアイコン一覧
  iconList: IconData[];
  // バッグに入ったアイコン一覧 (どのバッグに入ったかも管理したければ bagId を持たせる)
  bagList: {
    bagId: number;
    icon: IconData;
  }[];
};

const initialState: IconsState = {
  iconList: [],
  bagList: [],
};

export const iconsSlice = createSlice({
  name: 'icons',
  initialState,
  reducers: {
    // アイコンを追加する（モーダルで登録ボタンを押したときに dispatch）
    addIcon: (state, action: PayloadAction<IconData>) => {
      state.iconList.push(action.payload);
    },
    // アイコンを削除する
    removeIcon: (state, action: PayloadAction<number>) => {
      state.iconList = state.iconList.filter(
        (icon) => icon.id !== action.payload
      );
    },
    // あるアイコンを bag に入れる
    moveIconToBag: (
      state,
      action: PayloadAction<{
        iconId: number;
        bagId: number;
      }>
    ) => {
      const { iconId, bagId } = action.payload;
      const iconIndex = state.iconList.findIndex((icon) => icon.id === iconId);
      if (iconIndex !== -1) {
        // アイコンを取り出す
        const icon = state.iconList[iconIndex];
        // bagList に追加
        state.bagList.push({
          bagId,
          icon,
        });
        // もとの iconList から削除
        state.iconList.splice(iconIndex, 1);
      }
    },
  },
});

// Action Creator をエクスポート
export const { addIcon, removeIcon, moveIconToBag } = iconsSlice.actions;

// reducer をデフォルトエクスポート
export default iconsSlice.reducer;
