import React from "react";

const CreateUser = () => {
  return (
    <div>
      <h1>CreateUser</h1>
      <form>
        <label for="email">Email</label>
        <br/>
        <input type="text" id="email" name="email" />
        <br />
        <label for="userName">User Name</label>
        <br/>
        <input type="text" id="userName" name="userName" />
        <br />
        <label for="pass">Password</label>
        <br/>
        <input type="text" id="pass" name="pass" />
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
};

export default CreateUser;

// {"user": {"email": "abc@123.com", "password": "super-secret", "display_name": "Superman"}}
