import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import type { RootState, AppDispath } from "../store/store";

export const useAppDispatch = () => useDispatch<AppDispath>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
