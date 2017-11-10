import React, { Component } from 'react';
import { prefetch } from 'react-static'

import PostHeaderPreview from '../PostHeaderPreview';
import Link from '../Link';
import { MdPageInfo } from '../../types';

interface Props {
  url: string;
}

interface State {
  data: MdPageInfo;
}

export default class MdPostHeader extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: null,
    };

    prefetch(props.url)
      .then(({ initialProps }) => {
        this.setState({
          data: initialProps,
        });
      });
  }

  render() {
    if (this.state.data) {
      console.log(this.state.data);

      if (this.state.data.data) {
        return (
          <Link to={this.props.url}>
            <PostHeaderPreview {...this.state.data.data} />
          </Link>
        );
      } else {
        return (
          <PostHeaderPreview
            title="Couldn't load Info"
            filename="loading"
            id="loading"
            url="."
            layout="none"
            date=""
          />
        );
      }
    } else {
      return (
        <PostHeaderPreview 
          title="Loading..."
          filename="loading"
          id="loading"
          url="."
          layout="none"
          date=""
        />
      );
    }
  }
}

