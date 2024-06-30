import PostCreate from "../features/Saler/page/post-create";
import PostManagementPage from "../features/Saler/page/post-management";

export const salerRoute = [
  { path: "post-management", element: PostManagementPage },
  { path: "post-create", element: PostCreate },
  //   { path: "post-detail/:id", element: "" },
];
