import { create } from "zustand";
type newRate = { casinoId: string; gameId: string };
type newJackpot = { casinoId: string; jackpotId: string };
type jackpotHasBeenDrawn = {
  casinoId: string;
  jackpotHasBeenDrawn: string;
  amount: number;
  casinoName: string;
  ccy: string;
  imageUrl: string;
  jackpotId: string;
};

type State = {
  newRate?: newRate;
  newJackpot?: newJackpot;
  jackpotHasBeenDrawn?: jackpotHasBeenDrawn;
  isOn: boolean;
};

const useStore = create<State>((set, get) => ({
  isOn: false,
  newRate: undefined,
  newJackpot: undefined,
  jackpotHasBeenDrawn: undefined,
}));

export default useStore;
