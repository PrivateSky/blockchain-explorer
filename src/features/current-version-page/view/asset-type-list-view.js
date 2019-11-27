import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";

const styles = theme => ({
  assetTypesGrid: {
    flexGrow: 1,
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  folderCard: {
    width: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  cardContent: {
    padding: 6
  },
  button: {
    padding: 0
  },
  folderIcon: {
    margin: theme.spacing.unit,
    fontSize: 100,
    color: "orange"
  }
});

const AssetTypeView = ({ classes, assetTypes }) => {
  return (
    <Grid container className={classes.assetTypesGrid} spacing={16}>
      <Grid item xs={12}>
        <Grid container spacing={16}>
          {assetTypes.map(assetType => (
            <Grid key={assetType.name} item>
              <Card className={classes.folderCard}>
                <CardContent className={classes.cardContent}>
                  <IconButton
                    className={classes.button}
                    aria-label="Details"
                    component={Link}
                    to={`/current-version/${assetType.name}`}
                  >
                    <FolderIcon className={classes.folderIcon} />
                  </IconButton>
                </CardContent>

                <CardActions>
                  <Link to={`/current-version/${assetType.name}`}>
                    <Typography variant="subtitle1"> {assetType.name}</Typography>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

AssetTypeView.propTypes = {
  classes: PropTypes.object.isRequired,
  assetTypes: PropTypes.array.isRequired
};

export default withStyles(styles)(AssetTypeView);
