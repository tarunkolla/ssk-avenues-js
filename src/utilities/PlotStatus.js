export const plotStatus = {
  LISTED: 'LISTED',
  PENDING: 'PENDING',
  ONHOLD: 'ONHOLD',
  SOLD: 'SOLD',
};

const getStatus = (status) => {
  switch (status) {
    case plotStatus.LISTED:
      return 'success';
    case plotStatus.PENDING:
      return 'warning';
    case plotStatus.ONHOLD:
      return 'danger';
    case plotStatus.SOLD:
      return 'dark';
  }
};

export default getStatus;
