import { Inngest } from "inngest";
import User from "../models/user.model.js";
import "dotenv/config";
import connectDB from "../config/db.js";

export const inngest = new Inngest({
  id: "pingUp-app",
  eventKey: process.env.INNGEST_EVENT_KEY,
  signingKey: process.env.INNGEST_SIGNING_KEY,
  mode: "cloud",
});

// User Creation
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    return step.run("create-user", async () => {
      await connectDB();

      const { id, first_name, last_name, email_addresses, image_url } =
        event.data;

      let username = email_addresses[0].email_address.split("@")[0];

      // check availability of username
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        username = username + Math.floor(Math.random() * 10000);
      }

      const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        full_name: `${first_name} ${last_name}`,
        profile_picture: image_url,
        username,
      };

      return User.create(userData);
    });
  }
);

// User Deletion
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    return step.run("delete-user", async () => {
      await connectDB();

      const { id } = event.data;
      return User.findByIdAndDelete(id);
    });
  }
);

// User Update
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event, step }) => {
    return step.run("update-user", async () => {
      await connectDB();

      const { id, first_name, last_name, email_addresses, image_url } =
        event.data;

      const updatedUserData = {
        email: email_addresses[0].email_address,
        full_name: `${first_name} ${last_name}`,
        profile_picture: image_url,
      };

      return User.findByIdAndUpdate(id, updatedUserData);
    });
  }
);

// Export functions
export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];
