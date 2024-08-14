import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';

const useScreenSize = () => {
    const breakpoints = {
        isMobileScreen: useMediaQuery(
            json2mq({
                maxWidth: 575,
            }),
        ),
        isTabletScreen: useMediaQuery(
            json2mq({
                minWidth: 576,
            }),
        ),
        isMediumScreen: useMediaQuery(
            json2mq({
                minWidth: 900,
            }),
        ),
        isWebScreen: useMediaQuery(
            json2mq({
                minWidth: 992,
            }),
        ),
        isLargeScreen: useMediaQuery(
            json2mq({
                minWidth: 1201,
            }),
        ),
        isShowRightLayout: useMediaQuery(
            json2mq({
                minWidth: 1325,
            }),
        ),
    };
    return breakpoints;
};

export default useScreenSize;
