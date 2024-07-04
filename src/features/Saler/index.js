import { Navigate, Route, Routes } from "react-router-dom";
import { salerRoute } from "../../routes/salerRoutes";

function SalerRouter() {
  return (
    <>
      <Routes>
        <Route path="" element={<Navigate to={"/saler/post-management"} />} />
        {salerRoute.map((item, index) => {
          return (
            <Route key={index} path={item.path} element={<item.element />} />
          );
        })}
        <Route />
      </Routes>
    </>
  );
}

export default SalerRouter;
