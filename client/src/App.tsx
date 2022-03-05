import { Route, Routes } from 'react-router-dom';
import {
  Layout,
  Login,
  PersistLogin,
  Register,
  RequireAuth,
} from './components';
import './index.css';
import { Home, Missing } from './pages';
import { Admin, Editor, LinkPage, Lounge, Unauthorized } from './views';

enum ROLES {
  User = 2001,
  Editor = 1984,
  Admin = 5150,
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* 404 route */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
