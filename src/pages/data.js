export const DefaultDxGridConfiguration = {
    visible: true,
    showRowLines: true,
    showColumnLines: true,
    showBorders: true,
    'load-panel': {enabled: false},
    selection: {mode: 'single'},
    searchPanel: {visible: true},
    focusedRowEnabled: false,
    rowAlternationEnabled: true,  
    columnHidingEnabled: true,
    hoverStateEnabled: true,
    width: '100%',
    height:'calc(100vh - 310px)',
    columnAutoWidth: true,
    allowColumnReordering: true,
    allowColumnResizing: true,
    columnResizingMode:'widget',
    headerFilter:{
      visible:true,
      allowSearch:true
    },
    wordWrapEnabled: true,
    paging:{ enabled:true, pageSize:10 },
    scrolling: {
      showScrollbar: 'always',
      useNative: false,
    },
    
  }