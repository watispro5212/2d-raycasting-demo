# 2d-raycating-demo

## Overview
This project is a 2D visualization of raycasting.
It simulates how light behaves by casting rays from a specific source and calculating their intersection points with surrounding boundaries.
This technique is the foundation for 2D lighting effects, line of sight mechanics,
and is a early method for rendering 3D like perspectives from a 2D map.

## Getting Started
### Prerequisite(s):
- Node.js
- Working mouse / touchpad
- A modern web browser

### Install dependencies
```bash
npm install
```

### Bundle source files
```bash
npm run build
```

### Run demo
```bash
npx serve
```

## The Math & Logic

### 1. Setting the Equations
To find where a ray hits a wall, we represent both the **ray** and the **wall (line segment)** as vector equations.<br>
A point on any line is defined as: `origin + (distance * direction_vector)`

| Variable | Definition |
| :--- | :--- |
| $\vec{r}$ | The origin point of the ray (the "source"). |
| $\vec{d}$ | The direction vector of the ray ($d_x, d_y$). |
| $t$ | The distance multiplier along the ray. |
| $\vec{s}$ | The starting point (origin) of the wall segment. |
| $\vec{h}$ | The vector representing the wall's length and direction. |
| $u$ | The distance multiplier along the wall segment. |

### 2. The System of Equations
An intersection occurs when the ray and the wall share the exact same $(x, y)$ coordinate.<br>
We set the equations equal to each other:
$$\vec{r} + t\vec{d} = \vec{s} + u\vec{h}$$

To solve for the unknowns ($t$ and $u$), we break this into two linear equations.<br>
One for the x-axis and one for the y-axis:
1. $r_x + td_x = s_x + uh_x$
2. $r_y + td_y = s_y + uh_y$

### 3. Solving the System
By isolating the variables through algebraic substitution, we define the following formulas to find our distances:

$$t = \frac{(s_x - r_x)h_y - (s_y - r_y)h_x}{h_x d_y - d_x h_y}$$

$$u = \frac{(r_x - s_x)d_y - (r_y - s_y)d_x}{h_x d_y - d_x h_y}$$

> **Note:** If the denominator ($h_x d_y - d_x h_y$) equals **zero**, the ray and the wall are parallel and will never intersect.

### 4. Final Checks
Calculating $t$ and $u$ identifies an intersection on an infinite line, but we must verify the hit is valid within our specific segment:

* **Forward Direction ($t \ge 0$):** Ensures the ray is pointing toward the wall.
    - If $t < 0$, the ray is point away from the wall.
* **Within Segment ($0 \le u \le 1$):** Ensures the contact point is actually on the wall segment and not just on the infinite line it's on.
    * $u = 0$: Hit the start of the segment.
    * $u = 1$: Hit the end of the segment.

> [!IMPORTANT]
> **Note:** Do not forget to check for if the denominator equals **zero**.