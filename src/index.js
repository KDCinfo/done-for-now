// @TODO:

    // This code is being brought over from CodePen.
    // IN PROGRESS: The components will be separated out into their own files.

// @APP:
    // "Done (for now)"

    // A React-based Web App Multi-Timer with custom snooze and a one-at-a-time notification queue.

    // 'Done (for now)' provides timer alerts (via a modal) with Snooze/Done/Disable options, and an adjustable
    // snooze delay. It also provides a custom notification 'queue' which accounts for overlapping/simultaneous alerts.

import React from 'react'
import ReactDOM from 'react-dom'

import TimerBox from './App'

if(process.env.NODE_ENV !== 'production') {
    ;console.clear();
}

ReactDOM.render(
    <TimerBox />,
    root
)
