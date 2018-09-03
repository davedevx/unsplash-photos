// @flow

import React, { Fragment, type Node as ReactNode, type ComponentType } from 'react'
import axios from 'axios'
import {
  Button,
  Col,
  Input,
  Spin,
} from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'

import List from '../../List'
import { addNotification as addNotificationAction } from '../../../actions'
import type { Notification, PhotoSearchResult } from '../../../types'

const { Search, Group } = Input

type Props = {
  addNotification: Function,
}

type State = {
  isLoading: boolean,
  keyword: string,
  nextPage: number,
  data: PhotoSearchResult,
}

const withPhotoSearch = (Component: ComponentType<{}>):
  ComponentType<Props> => class extends React.Component<Props, State> {
  keyword: string = ''

  constructor(props: Props) {
    super(props)

    this.state = {
      isLoading: false,
      keyword: '',
      nextPage: 0,
      data: {
        next_page: 0,
        results: [],
        total: 0,
        total_pages: 0,
      },
    }
  }

  handleChangeSearch = (e) => {
    const keyword: string = e.target.value

    this.setState({
      keyword,
    })
  }

  handleOnSearch = async (): Promise<void> => {
    await this.doSearch()
  }

  async doSearch() {
    const { data: { next_page: nextPage, results }, keyword } = this.state
    const isSameSearch: boolean = this.keyword === keyword
    const page: number = isSameSearch ? nextPage : 0

    this.keyword = keyword

    this.setState({
      isLoading: true,
    })

    try {
      const data = await axios({
        url: '/api/searchPhotos',
        params: {
          keyword: encodeURI(keyword),
          page,
        },
      })

      if (data.data.error) {
        this.renderErrorNotification([data.data.error])
      } else if (data.data.errors) {
        this.renderErrorNotification(data.data.errors)
      }
      if (data.data.error || data.data.errors) {
        this.setState({
          isLoading: false,
        })

        return
      }

      if (isSameSearch) {
        this.setState({
          data: {
            ...data.data,
            results: results.concat(data.data.results),
          },
        })
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
    const { isLoading, keyword, data: { results: photos, total } } = this.state

    return (
      <Fragment>
        <Component />

        <Group
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Col span={6}>
            <Search
              placeholder="Enter keyword like 'travel'"
              onSearch={this.handleOnSearch}
              onChange={this.handleChangeSearch}
              value={keyword}
              enterButton
            />
          </Col>
        </Group>

        <Spin spinning={isLoading}>
          <List photos={photos} />

          {photos && photos.length > 0
            && (
              <Button
                type="primary"
                onClick={this.handleOnSearch}
                disabled={total === photos.length}
              >
                Load more...
              </Button>
            )
          }
        </Spin>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  addNotification: (error: Notification) => dispatch(addNotificationAction(error)),
})

const composedHoc = compose(
  connect(null, mapDispatchToProps),
  withPhotoSearch,
)

export default composedHoc
