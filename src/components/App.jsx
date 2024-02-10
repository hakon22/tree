import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';

const response = {
  services: [
    {
      id: 1,
      head: null,
      name: 'Проф.осмотр',
      node: 0,
      price: 100.0,
      sorthead: 20,
    },
    {
      id: 2,
      head: null,
      name: 'Хирургия',
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 3,
      head: 2,
      name: 'Удаление зубов',
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 4,
      head: 3,
      name: 'Удаление зуба',
      node: 0,
      price: 800.0,
      sorthead: 10,
    },
    {
      id: 5,
      head: 3,
      name: 'Удаление 8ого зуба',
      node: 0,
      price: 1000.0,
      sorthead: 30,
    },
    {
      id: 6,
      head: 3,
      name: 'Удаление осколка зуба',
      node: 0,
      price: 2000.0,
      sorthead: 20,
    },
    {
      id: 7,
      head: 2,
      name: 'Хирургическое вмешательство',
      node: 0,
      price: 200.0,
      sorthead: 10,
    },
    {
      id: 8,
      head: 2,
      name: 'Имплантация зубов',
      node: 1,
      price: 0.0,
      sorthead: 20,
    },
    {
      id: 9,
      head: 8,
      name: 'Коронка',
      node: 0,
      price: 3000.0,
      sorthead: 10,
    },
    {
      id: 10,
      head: 8,
      name: 'Слепок челюсти',
      node: 0,
      price: 500.0,
      sorthead: 20,
    },
  ],
};

const App = () => {
  const { DirectoryTree } = Tree;

  const titleGen = (service) => (service.price ? `${service.name} (${service.price})` : `${service.name}`);

  const servicesHandler = (services) => {
    const generals = services
      .sort((a, b) => a.sorthead - b.sorthead)
      .reduce((acc, service) => {
        if (!service.head) {
          acc.push({
            title: titleGen(service),
            key: `${service.id}`,
            children: [],
            isLeaf: service.node === 0,
          });
          return acc;
        }
        return acc;
      }, []);

    const childrenHandler = (childrens, key) => childrens
      .sort((a, b) => a.sorthead - b.sorthead)
      .reduce((acc, service) => {
        if (!service.name) return acc;
        acc.push({
          title: titleGen(service),
          key: `${key}-${service.id}`,
          children: service.node
            ? childrenHandler(services.filter((node) => node.head === service.id), `${key}-${service.id}`)
            : null,
          isLeaf: service.node === 0,
        });
        return acc;
      }, []);

    return services.reduce((acc, service) => {
      const generalIndex = acc.findIndex((general) => Number(general.key) === service.head);
      if (service.head && generalIndex !== -1) {
        acc[generalIndex].children.push({
          title: titleGen(service),
          key: `${acc[generalIndex].key}-${service.id}`,
          children: service.node
            ? childrenHandler(services.filter((node) => node.head === service.id), `${acc[generalIndex].key}-${service.id}`)
            : null,
          isLeaf: service.node === 0,
        });
        return acc;
      }
      return acc;
    }, generals);
  };

  return (
    <DirectoryTree
      multiple
      switcherIcon={<DownOutlined />}
      treeData={servicesHandler(response.services)}
    />
  );
};

export default App;
