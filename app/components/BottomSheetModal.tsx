import { BottomSheet } from "react-spring-bottom-sheet";
import Image from "next/image";
import { close } from "../assets";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import _ from "lodash";
import TableClientSide from "./table/TableClientSide";
import { useGamesListStore } from "../(store)/store";
// import 'react-spring-bottom-sheet/dist/style.css'

type BottomSheetModalProps = {
  open: boolean;
  setOpen: (trueFalse: boolean) => void;
  onAddToCompare: (gameData: GameData) => void;
  gameId: string;
  isFiat?: string;
};

const BottomSheetModal = ({
  open,
  setOpen,
  onAddToCompare,
  gameId,
  isFiat,
}: BottomSheetModalProps) => {
  const t = useTranslations("bottomSheetModal");
  const { setHandleRecall } = useGamesListStore();
  const [keyWord, setKeyWord] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [isFiatState, setIsFiatState] = useState<string>(isFiat || "false");

  const onAddToCompareAndClearBottomSheet = (GameData: GameData) => {
    onAddToCompare(GameData);
    setSearchKeyInBottomSheet("");
    setOrderBy("");
    // setGames(undefined);
    // setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setSearchKeyInBottomSheet = useCallback(
    _.debounce((key) => {
      setKeyWord(key);
    }, 500),
    []
  );

  useEffect(() => {
    if (open) {
      setHandleRecall(false);
    }
  }, [open]);

  return (
    <BottomSheet
      blocking={false}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight - 87]}
      open={open}
      onDismiss={() => {
        setOpen(false);
        // setGames(undefined);
      }}
      onSpringStart={(event) => {
        if (event.type === "SNAP" && event.source === "dragging") {
        }
      }}
    >
      <div className="bg-dark1 py-8 flex justify-center ">
        <div className=" w-[100%] max-w-screen-xl lg:px-0 px-4">
          <div className="fixed z-10 bg-dark1 flex top-0 h-20 items-center justify-between w-[100%] max-w-screen-xl pr-4 lg:px-0 ">
            <span className=" text-2xl leading-4  text-white">{t("select-slot-to-compare")}</span>

            <button
              className="flex items-center justify-center rounded-xl bg-dark2 p-2 hover:bg-dark3 mx-4 lg:mx-0 "
              onClick={() => {
                setOpen(false);
                setSearchKeyInBottomSheet("");
                setOrderBy("");
              }}
            >
              <Image src={close} alt="" className="h-6 w-6" width={24} height={24} />
            </button>
          </div>

          <div className="py-4 lg:py-8">
            <TableClientSide
              // directionBottomsheet={direction}
              showFilter={true}
              keyWordBottomsheet={keyWord}
              orderByBottomsheet={orderBy}
              isFiatBottomsheet={isFiatState}
              onAddToCompare={onAddToCompareAndClearBottomSheet}
              setSearchKeyInBottomSheet={setSearchKeyInBottomSheet}
              setOrderByKeyInBottomSheet={(order) => order && setOrderBy(order)}
              setIsFiatState={(isFiatState) => setIsFiatState(isFiatState)}
              gameId={gameId}
            />
          </div>
          <div className=" h-36 w-4"></div>
        </div>
      </div>
    </BottomSheet>
  );
};

const arePropsEqual = (prevProps: any, nextProps: any) => {
  // Add your custom logic here to compare the props.
  // Return true if you want to skip re-render, or false if re-render is needed.

  // For example, if you want to skip re-render when the "count" prop doesn't change:

  return prevProps.open === nextProps.open;
};
export default memo(BottomSheetModal, arePropsEqual);
