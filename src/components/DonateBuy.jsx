import React from "react";

const DonateBuy = () => (
  <div>
    <h1>Donate & Buy</h1>
    <form>
      <label>
        Amount:
        <input type="number" name="amount" />
      </label>
      <button type="submit">Donate</button>
    </form>
  </div>
);

export default DonateBuy;
