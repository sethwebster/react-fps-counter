# React Fps Counter
This package provides a component to overlay of the number of FPS (frames per second) of your React page.

![What the FPS Display Looks Like](https://github.com/sethwebster/fpscounter/blob/913a998ff22894dbf2fa3d48d1598e27e010816f/images/screenshot.png?raw=true)

You can see the current FPS, and the average FPS over a number of frames.

## Usage
If you want to measure FPS across your entire React App, it's best to place the `FPSCounter` component at the root of your app. Otherwise, if you only want to measure a specific component or page, place the component there.

```jsx
import { useState } from 'react';
import FPSCounter from '@sethwebster/react-fps-counter';

function App() {
  const [fpsVisible, setFpsVisible] = useState(true)
  return (
    <div>
    ...
    <FPSCounter visible={fpsVisible}/>
    ...
    </div>
  )
}

 targetFrameRate?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  colorTiers?: ColorTiers;
  visible?: boolean;
  numberOfFramesForAverage?: number;
  samplePeriod?: number;
```

### Options
<table>
<tr>
  <th>Option</th>
  <th>Default</th>
  <th>Notes</th>
</tr>
<tr>
  <td>visible</td>
  <td>false</td>
  <td>Controls the visibility of the component</td>
</tr>
<tr>
  <td>targetFrameRate</td>
  <td>255</td>
  <td>Specifies the desired number of frames per second. Used to calculate the graph.</td>
</tr>
<tr>
  <td>position</td>
  <td>
  
  `top-left`
  
  </td>
  <td>
  
  Controls the position of the component. Possible values are: `top-left`, `top-right`, `bottom-left`, `bottom-right`
  
  </td>
</tr>
<tr>
  <td>samplePeriod</td>
  <td>1000</td>
  <td>Specifies how long each sample period should be in illiseconds. Smaller numbers sample more often.</td>
</tr>
<tr>
  <td>numberOfFramesForAverage</td>
  <td>5</td>
  <td>The number of frames to sample for an average.</td>
</tr>
<tr>
  <td>colorTiers</td>
  <td>
  
  ```js 
  {   
    0.1: "red",  
    0.35: "orange",  
    0.5: "yellow",  
    0.75: green" 
  }
  ```
  </td>
  <td>
  
  The colors to use in the graph, and the appropriate threshold for each color. Thresholds are specified in percentage of the specified `targetFrameRate`.
  
  </td>
</tr>
</table>

### License
[MIT](./LICENSE.txt)