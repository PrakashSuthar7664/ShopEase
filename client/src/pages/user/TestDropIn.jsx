import React, { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const TestDropIn = () => {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  console.log(instance)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
        console.log("Fetched Token:", data.clientToken); // Debugging
        setClientToken(data.clientToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  return (
    <div>
      <h2>Test Payment</h2>
      {clientToken ? (
        <DropIn
  key={clientToken}
  options={{ authorization: clientToken }}
  onInstance={(inst) => {
    console.log("DropIn instance initialized:", inst);
    setInstance(inst);
  }}
/>
      ) : (
        <p>Loading payment gateway...</p>
      )}
    </div>
  );
};

export default TestDropIn;
