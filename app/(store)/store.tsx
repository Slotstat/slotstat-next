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
  provider: string;
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
  gamesList?: gamesList;
  setGames: (games: gamesList) => void;
};

const useStore = create<State>((set, get) => ({
  isOn: false,
  newRate: undefined,
  newJackpot: undefined,
  jackpotHasBeenDrawn: undefined,
  newRtp: undefined,
  newUser: undefined,
  gamesList: undefined,
  setGames: (games: gamesList) => ({ gamesList: games }),
}));

type GamesListState = {
  gamesList?: gamesList;
  handleRecall: boolean;
  setGames: (games: gamesList) => void;
  setHandleRecall: (help: boolean) => void;
};

export const useGamesListStore = create<GamesListState>((set, get) => ({
  gamesList: undefined,
  handleRecall: false,
  setGames: (games: gamesList) => set(() => ({ gamesList: games })),
  setHandleRecall: (help: boolean) => {
    console.log("help", help);
    return set(() => ({ handleRecall: help }));
  },
}));

export default useStore;
