import React, { useState } from "react";

const Comments = ({ p, i }) => {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <button onClick={() => setModal(!modal)}>Click</button>
      {modal && <h2>worked</h2>}
    </div>
  );
};

export default Comments;
