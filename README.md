# Recruiting Project

This is a small coding project for software developer candidates.

## Getting Started Locally

First, make sure you can run this on your machine. Node 18.X or later
is recommended.

```javascript
cd GuestTracker
npm ci
npm run dev
```

You should now be able to view the application at: http://localhost:5173

The project should automatically hot-reload as you make changes.

## Project Requirements

Nyan Cat will be performing at your house. You can only fit 20 people
so this app will keep track of who is coming.

Here are the features:

- For each guest, you'll track email address and number of tickets
  - You don't need to track anything else (like name, etc)
- Show a table of all the guests
- There should be a way to add, edit, and delete guests
- When editing a guest, the user should be able to cancel
- Show the total number of guests somewhere

For your convenience, use the Guest Repository to load/save data.
For simplicity, do not worry about error reporting, but do enforce the app requirements:

    import GuestRepository from 'src/services/guest-repository';

    const repo = new GuestRepository();

    // Fetch guests
    const guests = await repo.load();
    > [ { email: 'foo@bar.com', tickets: 3 }, ...]

    // Save guests
    guests.splice(0, 1);
    await repo.save(guests);

    // Reset (if desired)
    await repo.reset();
