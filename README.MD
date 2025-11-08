# House Points Tracker

A real-time Harry Potter house points tracker with admin control and display modes. Perfect for families!

## Features

- **5 Houses**: Gryffindor, Slytherin, Hufflepuff, Ravenclaw, and Hogwarts
- **Real-time sync**: Points update instantly across all devices
- **Admin Panel**: Control points from your phone with touch-friendly buttons
- **Display Mode**: Beautiful full-screen display for your TV
- **Animations**: CSS transitions for point changes
- **Local Network**: Runs on your home network, no external services needed

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

The server will start and display URLs like:

```
📺 TV Display: http://192.168.1.5:3000/display.html
📱 Admin Panel: http://192.168.1.5:3000/admin.html
```

### 3. Open on Your Devices

- **TV**: Open the Display URL in your TV's browser
- **Phone**: Open the Admin Panel URL in your phone's browser

Note: Replace `192.168.1.5` with the actual IP address shown in your terminal.

## Usage

### Admin Panel (Phone)

- Tap the **+1, +5, +10, +50** buttons to add points
- Tap the **-1, -5, -10, -50** buttons to subtract points
- Use **Reset All Points** to set all houses back to 0
- The current points are displayed next to each house name

### Display (TV)

- Automatically shows all house points
- Animates when points change
- Shows a floating indicator with the point change
- Connection status indicator in the top-right corner

## Troubleshooting

**Can't connect from phone/TV:**
- Make sure all devices are on the same WiFi network
- Check that your computer's firewall allows connections on port 3000
- Try using `localhost:3000` if testing on the same computer

**Points not updating:**
- Check the connection status indicator
- Refresh the pages to reconnect
- Restart the server with `npm start`

## Tech Stack

- **Backend**: Node.js + Express + WebSocket (ws)
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Real-time**: WebSocket for instant updates across devices