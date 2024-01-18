const getInitialLabel = () => ([
  {
    id: 1,
    name: 'HTML',
    hexcode: '#DC3545',
  },
  {
    id: 2,
    name: 'CSS',
    hexcode: '#185ADB',
  },
  {
    id: 3,
    name: 'JavaScript',
    hexcode: '#FFA41B',
  },
  {
    id: 4,
    name: 'ReactJS',
    hexcode: '#57c4bc',
  },
  {
    id: 5,
    name: 'Webpack',
    hexcode: '#B15EFF',
  },
]);

const getLabelName = (data, id) => {
  const foundLabel = data.find(label => label.id == id);
  return foundLabel ? foundLabel.name : '';
};

const getLabelHexCode = (data, id) => {
  const foundLabel = data.find(label => label.id == id);
  return foundLabel ? foundLabel.hexcode : '';
};

export { getInitialLabel, getLabelName, getLabelHexCode };