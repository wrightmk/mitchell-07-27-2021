import React from "react";
import { Order } from "../types";
import { Default, Mobile } from "./Responsive";
import {
  Table,
  Th,
  DataTd,
  DataTr,
  DepthVisualizerTd,
  WrapperTr,
  TableHeadTr,
  // TestTd,
} from "./styles";

interface Props {
  bids: Order;
  decimalPlace: number;
  highestTotalInBook: number;
  hasLoaded: boolean;
}

const Bids = React.memo(
  ({ bids, decimalPlace, highestTotalInBook, hasLoaded }: Props) => {
    const renderTbody = (isMobile?: boolean) =>
      Object.values(bids)
        .sort((a, b) => {
          return b.price - a.price;
        })
        .map((d) => (
          <WrapperTr key={d.price}>
            <tr>
              <DepthVisualizerTd
                type="bids"
                isMobile={isMobile}
                /**
               * @description
               passing this magnitude of change to js-in-css (styled components) breaks the UI, inline style fixes it
              */
                style={{ width: `${(d.total / highestTotalInBook) * 100}%` }}
              />
            </tr>
            <DataTr>
              <Default>
                <DataTd>{d?.total.toLocaleString()}</DataTd>
                <DataTd>{d?.size.toLocaleString()}</DataTd>
                <DataTd type="bids">
                  {d?.price.toFixed(decimalPlace).toLocaleString()}
                </DataTd>
              </Default>
              <Mobile>
                <DataTd type="bids">
                  {d?.price.toFixed(decimalPlace).toLocaleString()}
                </DataTd>
                <DataTd>{d?.size.toLocaleString()}</DataTd>
                <DataTd>{d?.total.toLocaleString()}</DataTd>
              </Mobile>
            </DataTr>
          </WrapperTr>
        ));
    return (
      <Table>
        <Default>
          <>
            {hasLoaded && (
              <thead>
                <TableHeadTr>
                  <Th>Total</Th>
                  <Th>Size</Th>
                  <Th>Price</Th>
                </TableHeadTr>
              </thead>
            )}
          </>
        </Default>
        <tbody>
          <Default>{renderTbody()}</Default>
          <Mobile>{renderTbody(true)}</Mobile>
        </tbody>
      </Table>
    );
  }
);

Bids.displayName = "Bids";

export default Bids;
