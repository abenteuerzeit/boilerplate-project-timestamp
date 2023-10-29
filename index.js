const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/**
 * Endpoint: "/api/:date?"
 *
 * Description:
 * This endpoint provides the Unix timestamp and UTC string representation
 * of a given date. It can handle both date strings and Unix timestamps as input.
 *
 * Usage:
 * 1. Without a date parameter:
 *    - URL: /api/
 *    - Returns the current time as a Unix timestamp and UTC string.
 *
 * 2. With a date string:
 *    - URL: /api/YYYY-MM-DD (e.g., /api/2023-01-01)
 *    - Returns the given date's Unix timestamp and UTC string.
 *
 * 3. With a Unix timestamp:
 *    - URL: /api/TIMESTAMP (e.g., /api/1641014400000)
 *    - Returns the date corresponding to the Unix timestamp in both Unix and UTC formats.
 *
 * Errors:
 * If an invalid date or timestamp is provided, the endpoint returns an error
 * message in the format: { error : "Invalid Date" }
 */
app.get("/api/:date?", (req, res) => {
  const dateStr = req.params.date;

  if (!dateStr) {
    return res.json({
      unix: Date.now(),
      utc: new Date().toUTCString(),
    });
  }

  const parsedDate = /^\d+$/.test(dateStr)
    ? new Date(parseInt(dateStr))
    : new Date(dateStr);

  return parsedDate.toString() === "Invalid Date"
    ? res.json({ error: "Invalid Date" })
    : res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString(),
    });
});

const listener = app.listen(process.env.PORT, function () {
  console.log("App listening on port " + listener.address().port);
});
