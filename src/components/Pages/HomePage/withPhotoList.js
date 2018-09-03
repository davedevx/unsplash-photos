// @flow

import React, { Fragment, type Node as ReactNode, type ComponentType } from 'react'
import axios from 'axios'
import { Card, Select } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'

import List from '../../List'
import { addNotification as addNotificationAction } from '../../../actions'
import type { OrderBy, Photo, Notification } from '../../../types'

type Props = {
  addNotification: Function,
}

type State = {
  isLoading: boolean,
  orderBy: OrderBy,
  data: Photo[],
}

const DEFAULT_ORDERING = 'popular'

const withPhotoList = (Component: ComponentType<{}>):
  ComponentType<Props> => class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isLoading: false,
      orderBy: DEFAULT_ORDERING,
      data: [],
    }
  }

  async componentDidMount() {
    await this.fetchBooks()
  }

  handleChangeSelect = (orderBy: OrderBy) => {
    this.setState({
      orderBy,
    }, async () => {
      await this.fetchBooks()
    })
  }

  async fetchBooks() {
    const { orderBy } = this.state

    this.setState({
      isLoading: true,
    })

    try {
      const data = await axios({
        url: '/api/getPopularPhotos',
        params: {
          orderBy,
        },
      })

      if (data.data.error) {
        this.renderErrorNotification([data.data.error])
      } else if (data.data.errors) {
        this.renderErrorNotification(data.data.errors)
      } else {
        this.setState({
          data: data.data,
        })
      }

      this.setState({
        isLoading: false,
      })
    } catch (e) {
      this.setState({
        isLoading: false,
      })

      this.renderErrorNotification([e.message])
    }
  }

  renderErrorNotification(errors: string[]): ReactNode {
    const { addNotification } = this.props

    addNotification({
      type: 'error',
      title: 'Error during fetching photos',
      description: errors.map((error: string) => error),
    })
  }

  render(): ReactNode {
    const { isLoading, data: photos, orderBy } = this.state

    return (
      <Fragment>
        <Component />

        Order by:
        <span>&nbsp;</span>

        <Select
          defaultValue={DEFAULT_ORDERING}
          value={orderBy}
          onChange={this.handleChangeSelect}
          disabled={isLoading}
        >
          <Select.Option value="popular">Popular</Select.Option>
          <Select.Option value="latest">Latest</Select.Option>
          <Select.Option value="oldest">Oldest</Select.Option>
        </Select>
        <span>&nbsp;</span>

        <Card
          loading={isLoading}
          bordered={false}
          bodyStyle={{ padding: 0 }}
        >
          <List photos={photos} />
        </Card>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  addNotification: (error: Notification) => dispatch(addNotificationAction(error)),
})

const composedHoc = compose(
  connect(null, mapDispatchToProps),
  withPhotoList,
)

export default composedHoc
