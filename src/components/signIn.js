import React from "react";

const SignIn = () => {
  return (
    <div>
      <form>
        <h1>Sign In</h1>
        <label for="user">User Name</label>
        <br />
        <input type="text" id="user" name="user" />
        <br />
        <label for="pass">Password</label>
        <br />
        <input type="text" id="pass" name="pass" />
        <br />
        <input type="submit" value="Submit"/>
      </form>

      

    </div>
  );
};

export default SignIn;
