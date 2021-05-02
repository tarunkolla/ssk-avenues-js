import React, { useEffect, useState, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import DownloadIcon from '@material-ui/icons/GetApp';
import DirectionsIcon from '@material-ui/icons/Directions';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Container,
  CardSubtitle,
  Button,
  Breadcrumb,
  CardColumns,
  Row,
  Col,
  CardHeader,
} from 'reactstrap';
import axios from 'axios';
import ResponsiveElement from 'terra-responsive-element';

import { ShareButton } from '../utilities/CustomIcons';
import ImageUploadModal from './ImageUploadModal';
import BrochureUploadModal from './BrochureUploadModal';
import LayoutEditModal from './LayoutEditModal';
import LayoutContactCard from './LayoutContactCard';
import PlotEditModal from './PlotEditModal';
import PlotCard from './PlotCard';
import Loading from './Loading';
import Retry from './Retry';
import { log, error } from '../utilities/Logger';

import '../styles/LayoutCardView.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    scrollBehavior: 'smooth',
    overflowY: 'scroll',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: 'rgb(255,255,255)',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const LayoutCardView = ({ layoutId, token, role }) => {
  const classes = useStyles();
  const [layout, setLayout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [colsRatio, setColsRatio] = useState(2);
  const [breakpoint, setBreakpoint] = useState('');
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const [isLayoutUploadOpen, setIsLayoutUploadOpen] = useState(false);
  const [isBrochureUploadOpen, setIsBrochureUploadOpen] = useState(false);
  const [isPlotUploadOpen, setIsPlotUploadOpen] = useState(false);

  const ref = useRef(null);

  const getLayout = useCallback(() => {
    axios({
      method: 'GET',
      url: `/api/layouts/${layoutId}`,
    })
      .then((res) => {
        setLayout(res.data);
        log('Layout load successful');
        setReload(false);
      })
      .catch(() => {
        setLayout(null);
        error(`Falied to load layout for ${layoutId}`);
        setReload(true);
      })
      .finally(setIsLoading(false));
  }, [layoutId]);

  const handleResize = useCallback(() => {
    let ratio = window.innerHeight / window.innerWidth;
    if (ratio < 0.75) ratio = 0.75;
    if (ratio > 2) ratio = 2;
    setColsRatio(ratio);
  }, []);

  const onShare = (title) => {
    if (navigator.share) {
      navigator
        .share({
          title: 'SSK Avenues',
          text: `${title || 'Check this out'}`,
          url: document.location.href,
        })
        .catch(() => {
          error('Something went wrong with sharing');
        });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(document.location.href).catch(() => {
        error('Something went wrong with sharing');
      });
    } else {
      error('Failed to copy');
    }
  };

  useEffect(() => {
    getLayout();
    window.addEventListener('resize', handleResize);
    handleResize();
  }, [getLayout, handleResize]);

  const scroll = (dir) => {
    const px = window.innerWidth * 0.85;
    dir === 'LEFT'
      ? (ref.current.scrollLeft -= px)
      : (ref.current.scrollLeft += px);
  };

  const imageUploadModalSubmit = () => {
    setIsImageUploadOpen(false);
  };

  const layoutUploadModalSubmit = () => {
    setIsLayoutUploadOpen(false);
  };

  const plotUploadModalSubmit = () => {
    setIsPlotUploadOpen(false);
  };

  const getDays = (date) => {
    const count = ((Date.now() - new Date(date)) / (1000 * 60 * 60 * 24)) | 0;
    return count > 1
      ? `Last updated: ${count} days ago`
      : `Last updated: Today`;
  };

  const PlotTitle = ({ isPresent }) => (
    <>
      <CardHeader
        style={{
          marginBottom: '15px',
          fontWeight: 'bold',
          backgroundColor: 'white',
          borderRadius: '.25rem',
        }}
      >
        {isPresent ? 'Available Plots:' : 'No plots avalilable'}
      </CardHeader>
    </>
  );

  const PlotContactGrid = ({ breakpoint, plots }) => {
    if (breakpoint === 'enormous') {
      return (
        <Row>
          <Col xs="9" style={{ paddingRight: '7.5px' }}>
            <PlotTitle isPresent={plots?.length} />
            <CardColumns style={{ columnCount: '6' }}>
              <PlotCard plots={plots} />
            </CardColumns>
          </Col>
          <Col xs="3" style={{ paddingLeft: '7.5px' }}>
            <LayoutContactCard />
          </Col>
        </Row>
      );
    } else if (breakpoint === 'huge' || breakpoint === 'large') {
      return (
        <Row>
          <Col xs="8" style={{ paddingRight: '7.5px' }}>
            <PlotTitle isPresent={plots?.length} />
            <CardColumns style={{ columnCount: '4' }}>
              <PlotCard plots={plots} />
            </CardColumns>
          </Col>
          <Col xs="4" style={{ paddingLeft: '7.5px' }}>
            <LayoutContactCard />
          </Col>
        </Row>
      );
    } else if (breakpoint === 'medium') {
      return (
        <Row>
          <Col xs="7" style={{ paddingRight: '7.5px' }}>
            <PlotTitle isPresent={plots?.length} />
            <CardColumns>
              <PlotCard plots={plots} />
            </CardColumns>
          </Col>
          <Col xs="5" style={{ paddingLeft: '7.5px' }}>
            <LayoutContactCard />
          </Col>
        </Row>
      );
    } else if (breakpoint === 'small') {
      return (
        <>
          <Row>
            <Col style={{ paddingRight: '7.5px' }}>
              <PlotTitle isPresent={plots?.length} />
              <CardColumns style={{ columnCount: '3' }}>
                <PlotCard plots={plots} />
              </CardColumns>
            </Col>
          </Row>
          <Row>
            <Col style={{ paddingLeft: '7.5px' }}>
              <LayoutContactCard />
            </Col>
          </Row>
        </>
      );
    } else {
      const length = plots?.length || 2;
      const split = Math.ceil(length / 2);

      return (
        <>
          <PlotTitle isPresent={plots?.length} />
          <Row>
            <Col style={{ paddingRight: '7.5px' }}>
              <CardColumns>
                <PlotCard plots={plots?.slice(0, split)} />
              </CardColumns>
            </Col>
            <Col style={{ paddingLeft: '7.5px' }}>
              <CardColumns>
                <PlotCard plots={plots?.slice(split, length)} />
              </CardColumns>
            </Col>
          </Row>
          <Row>
            <Col>
              <LayoutContactCard />
            </Col>
          </Row>
        </>
      );
    }
  };

  return (
    <ResponsiveElement onChange={(value) => setBreakpoint(value)}>
      {role.includes('STAFF') && (
        <Breadcrumb tag="nav" listTag="div">
          <Button
            className="admin-nav-bar-button"
            outline
            size="sm"
            onClick={() => setIsImageUploadOpen(true)}
          >
            Edit Images
          </Button>
          <Button
            className="admin-nav-bar-button"
            outline
            onClick={() => setIsLayoutUploadOpen(true)}
            size="sm"
          >
            Edit Layout
          </Button>
          <Button
            className="admin-nav-bar-button"
            outline
            onClick={() => setIsPlotUploadOpen(true)}
            size="sm"
          >
            Edit Plots
          </Button>
          <Button
            className="admin-nav-bar-button"
            outline
            onClick={() => setIsBrochureUploadOpen(true)}
            size="sm"
          >
            Edit Brochure
          </Button>
        </Breadcrumb>
      )}
      {layout && !isLoading && (
        <>
          <ImageUploadModal
            isOpen={isImageUploadOpen}
            onCancel={() => setIsImageUploadOpen(false)}
            onSubmit={imageUploadModalSubmit}
            images={layout?.images}
            layoutId={layoutId}
            token={token}
          />
          <BrochureUploadModal
            token={token}
            layoutId={layoutId}
            isOpen={isBrochureUploadOpen}
            onCancel={() => setIsBrochureUploadOpen(false)}
          />
          <LayoutEditModal
            token={token}
            layout={layout}
            isOpen={isLayoutUploadOpen}
            onClose={() => setIsLayoutUploadOpen(false)}
          />
          <PlotEditModal
            token={token}
            isOpen={isPlotUploadOpen}
            onCancel={() => setIsPlotUploadOpen(false)}
            onSubmit={plotUploadModalSubmit}
          />
          <Card>
            {layout?.images?.length ? (
              <div className="layout-container">
                <ArrowBackIosRoundedIcon
                  stroke-location="outside"
                  stroke="black"
                  strokeOpacity="0.4"
                  strokeWidth={1}
                  className="layout-arrow layout-left"
                  onClick={() => scroll('LEFT')}
                />
                <ArrowForwardIosRoundedIcon
                  stroke-location="outside"
                  stroke="black"
                  strokeOpacity="0.4"
                  strokeWidth={1}
                  className="layout-arrow layout-right"
                  onClick={() => scroll('RIGHT')}
                />
              </div>
            ) : null}
            <div style={{ borderRadius: '.25em' }} className={classes.root}>
              <GridList
                ref={ref}
                className={classes.gridList}
                cols={2}
                spacing={1}
              >
                {layout.images.map((each) => (
                  <GridListTile key={each.image} cols={colsRatio} rows={2}>
                    <img
                      src={`/api/images/${each.image}`}
                      alt={each.title}
                      onClick={() =>
                        window.open(`/api/images/${each.image}`, '_blank')
                      }
                    />
                    <GridListTileBar
                      title={each.title}
                      classes={{
                        root: classes.titleBar,
                        title: classes.title,
                      }}
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
            <CardBody>
              <CardTitle tag="h2">
                {layout.title}
                <span style={{ float: 'right' }}>
                  <ShareButton onClick={() => onShare(layout.title)} />
                  {layout.brochure && (
                    <Button
                      color="link"
                      onClick={() =>
                        window.open(
                          `/api/files/${layout.brochure}`,
                          'download_window'
                        )
                      }
                    >
                      <DownloadIcon /> Brochure
                    </Button>
                  )}
                </span>
              </CardTitle>

              <CardSubtitle>
                {layout.address && layout.addressHref ? (
                  <Button
                    style={{ padding: 'unset' }}
                    color="link"
                    onClick={() => window.open(layout.addressHref, '_blank')}
                  >
                    {layout.address}
                    <DirectionsIcon
                      style={{ paddingLeft: '.2em', paddiongBottom: '.2em' }}
                    />
                  </Button>
                ) : (
                  layout.address
                )}
              </CardSubtitle>

              <CardText>
                <small className="text-muted">
                  {getDays(layout.lastUpdated)}
                </small>
              </CardText>
              <CardText>{layout.description}</CardText>
            </CardBody>
          </Card>
          <div className="my-3" />
          <Container
            fluid
            style={{
              paddingRight: '0',
              marginRight: '0',
              paddingLeft: '0',
              marginLeft: '0',
            }}
          >
            <PlotContactGrid breakpoint={breakpoint} plots={layout.plots} />
          </Container>
        </>
      )}
      {isLoading && <Loading />}
      {reload && !isLoading && <Retry onReload={getLayout} />}
    </ResponsiveElement>
  );
};

export default LayoutCardView;
