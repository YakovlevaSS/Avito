import AppRoutes from "./routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUserFromLocalStorage } from "./store/slices/userSlice.js";



function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    // При монтировании компонента, диспетчеризуем действие для инициализации из localStorage
    dispatch(initializeUserFromLocalStorage());
  }, [dispatch]);

  return (
    <>
        <AppRoutes />
    </>
  );
}

export default App;
