# Tracker Allocation
## Problem
We have 3 roofs with 55 panels, 17 panels and 38 panels each.
We have 4 inverters (called A, B, C, D) each with two trackers.
Their lengths are:
| Tracker name | Length |
| ------------ | ------ |
| A0           | 8      |
| A1           | 8      |
| B0           | 9      |
| B1           | 9      |
| C0           | 12     |
| C1           | 8      |
| D0           | 26     |
| D1           | 30     |

How can we allocate the trackers to the panels?

## Installation
```
npm install
```
## Binary files
```
npm run example
```
This gives 4 options.
```
> tracker-allocation@1.0.0 example
> node ./bin/example.js

Option 0
55 = 8 + 8 + 9 + 30 = A0 + A1 + B0 + D1
17 = 9 + 8 = B1 + C1
38 = 12 + 26 = C0 + D0
Option 1
55 = 8 + 9 + 8 + 30 = A0 + B0 + C1 + D1
17 = 8 + 9 = A1 + B1
38 = 12 + 26 = C0 + D0
Option 2
55 = 8 + 9 + 12 + 26 = A0 + B0 + C0 + D0
17 = 8 + 9 = A1 + B1
38 = 8 + 30 = C1 + D1
Option 3
55 = 9 + 12 + 8 + 26 = B0 + C0 + C1 + D0
17 = 8 + 9 = A0 + B1
38 = 8 + 30 = A1 + D1
```