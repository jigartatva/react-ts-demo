import React from "react";
import { Table } from "antd";
import { DndProvider, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";

let dragingIndex = -1;

interface BodyRowProps {
  isOver?: boolean;
  connectDragSource: any;
  connectDropTarget: any;
  moveRow: any;
  index: number;
  className: string;
  style: React.CSSProperties;
}
class BodyRow extends React.Component<BodyRowProps> {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: "move" };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += " drop-over-downward";
      }
      if (restProps.index < dragingIndex) {
        className += " drop-over-upward";
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr {...restProps} className={className} style={style} />
      )
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index
    };
  }
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const DragableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(
  DragSource("row", rowSource, connect => ({
    connectDragSource: connect.dragSource()
  }))(BodyRow)
);

interface DndTableProps {
  loading: boolean;
  data: (object)[];
  columns: (object)[];
}

interface DndTableState {
  data: (object)[];
  columns: (object)[];
}

export default class DndTable extends React.Component<
  DndTableProps,
  DndTableState
> {
  constructor(props: DndTableProps) {
    super(props);
  }
  state: DndTableState = {
    data: [],
    columns: []
  };

  components = {
    body: {
      row: DragableBodyRow
    }
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
        }
      })
    );
  };
  componentDidMount(): void {
    const { data, columns } = this.props;
    this.setState({ data, columns });
  }

  componentDidUpdate(prevPorps): void {
    if (
      prevPorps.loading !== this.props.loading &&
      this.props.loading === false
    ) {
      const { data } = this.props;
      this.setState({ data });
    }
  }

  render() {
    const { loading } = this.props;
    const { data, columns } = this.state;

    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          className="dnd-table"
          components={this.components}
          rowKey={(record: any) => record.id}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow
          })}
        />
      </DndProvider>
    );
  }
}
