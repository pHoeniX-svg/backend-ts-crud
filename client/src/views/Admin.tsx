import { Link } from 'react-router-dom';
import { Users } from '~src/views';

const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <Users />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
export { Admin };
