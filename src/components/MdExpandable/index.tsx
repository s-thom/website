import React, { Component } from 'react';

import { isBrowser } from '../../browser';

import './index.css';

interface Props {
  title?: string;
  expanded?: boolean;
  children?: JSX.Element;
}

interface State {
  expanded: boolean;
}

export default class MdExpandable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: typeof this.props.expanded !== 'undefined',
    };
  }

  toggleExpansion() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    return (
      <div className={`MdExpandable${isBrowser ? '' : ' MdExpandable-static'}`}>
        <div className="MdExpandable-header">
          <p className="MdExpandable-title">
            {this.props.title || 'Expandable Section'}
          </p>
          <button 
            className="MdExpandable-button" 
            onClick={() => this.toggleExpansion()}
            aria-label="Expand"
            title="Expand this section"
          >
            {this.state.expanded ? '–' : '+'}
          </button>
        </div>
        {
          ((!isBrowser) || this.state.expanded) && (
            <section className="MdExpandable-container">
              {this.props.children}
            </section>
          )
        }
      </div>
    );
  }
}
