import { create } from "zustand";
type newRate = { casinoId: string; gameId: string };
type newJackpot = {
  casinoId: string;
  jackpotId: string;
  amount: string;
  ccy: string;
};
type jackpotHasBeenDrawn = {
  casinoId: string;
  jackpotHasBeenDrawn: string;
  amount: number;
  casinoName: string;
  ccy: string;
  imageUrl: string;
  jackpotId: string;
};

type RTPEvent = {
  casinoId: string;
  rtpId: string;
  value: number;
};

type State = {
  newRate?: newRate;
  newJackpot?: newJackpot;
  jackpotHasBeenDrawn?: jackpotHasBeenDrawn;
  isOn: boolean;
  newRtp?: RTPEvent;
  newUser?: { context?: string };
};

const useStore = create<State>((set, get) => ({
  isOn: false,
  newRate: undefined,
  newJackpot: undefined,
  jackpotHasBeenDrawn: undefined,
  newRtp: undefined,
  newUser: undefined,
}));

export default useStore;
