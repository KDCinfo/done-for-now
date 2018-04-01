import * as React from 'react';

import { Table } from 'react-bootstrap';

import Timer from './Timer';

interface TimerListState {
    id: number;
    title: string;
    time: string;
    cycle: number;
    active: boolean;
}

interface TimeoutListState {
    id: number;
    timer: number;
}

interface TimerDisplayListState {
    id: number;
    destination: number;
}

interface TimersProps {
    removeTimer: (timerId: number) => void;                     // removeTimer(timerId: number) {
    toggleTimeout: (timerId: number, onOff: string) => void;    // toggleTimeout(timerId: number, onOff: string) {
    timerList: TimerListState[];
    timeoutList: TimeoutListState[];
    timerDisplayList: TimerDisplayListState[];
    entryCycleList: string[];
    showSeconds: boolean;
}

interface TimersState {
    showX2b: boolean;
    showX2bOpt: boolean;
}

class Timers extends React.Component<TimersProps, TimersState> {
    constructor(props: TimersProps) {
        super(props);
        this.state = {
            showX2b: true,
            showX2bOpt: true
        };
        this.toggleX2b = this.toggleX2b.bind(this);
    }
    componentDidMount() {
        const showX2bOpt = this.props.timerList.findIndex( elem =>
                             elem.title.substr(0, 4) === 'x2b-'
                           ) >= 0 ? true : false;
        this.setState({ showX2bOpt });
    }
    toggleX2b() {
        this.setState({ showX2b: !this.state.showX2b });
    }
    render() {
        // console.log('[Timers] 1:', this.props.timeoutList)
        // console.log('[Timers] 2:', this.props.timerDisplayList)
        const hasTimers = this.props.timerList.reduce( (tC, t) => t.title.substr(0, 4) === 'x2b-' ? tC : tC + 1, 0 ),
              hideTable = !this.state.showX2b && (hasTimers === 0) ? 'hidden' : '';

        return (
            <div className="timers-div">
                <div className={'text-right' + (this.state.showX2bOpt ? '' : ' hidden')}>
                    <small>
                        <label>
                            Show '
                            <a
                                href="https://kdcinfo.github.io/expired-to-be/"
                                target="kdcNewWindow"
                                title="Expired To Be is an expiration reminder app with alarms (instead of timers)."
                            >
                                Expired To Be
                            </a>
                            ' alarms. <input type="checkbox" onChange={this.toggleX2b} checked={this.state.showX2b} />
                        </label>
                    </small>
                </div>
                <Table responsive={true} className={hideTable}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Start<br/>Time</th>
                            <th>Cycle</th>
                            <th>On/Off</th>
                            <th className="text-center">Time Until</th>
                            <th>Del</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.timerList.map( (entry, idx: number) => {
                            if (this.state.showX2b || (!this.state.showX2b && entry.title.substr(0, 4) !== 'x2b-')) {
                                return (
                                    <Timer
                                        key={idx}
                                        entry={entry}
                                        timeoutList={this.props.timeoutList}
                                        timerDisplayList={this.props.timerDisplayList}
                                        entryCycleList={this.props.entryCycleList}
                                        toggleTimeout={this.props.toggleTimeout}
                                        removeTimer={this.props.removeTimer}
                                        showSeconds={this.props.showSeconds}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Timers;