const steps = [
  {
    element: '#hamburger-container',
    popover: {
      title: '侧边栏',
      description: '打开/关闭 侧边栏',
      position: 'bottom'
    }
  },
  {
    element: '#breadcrumb-container',
    popover: {
      title: '面包屑',
      description: '指示当前页面位置',
      position: 'bottom'
    }
  },
  {
    element: '#header-search',
    popover: {
      title: '页面搜寻',
      description: '页面搜索，快速导航',
      position: 'left'
    }
  },
  {
    element: '#screenfull',
    popover: {
      title: '全屏',
      description: '将页面设置为全屏',
      position: 'left'
    }
  },
  // {
  //   element: '#size-select',
  //   popover: {
  //     title: 'Switch Size',
  //     description: 'Switch the system size',
  //     position: 'left'
  //   }
  // },
  {
    element: '#tags-view-container',
    popover: {
      title: '标签视图',
      description: '显示您访问过的页面的历史记录',
      position: 'bottom'
    },
    padding: 0
  }
]

export default steps
