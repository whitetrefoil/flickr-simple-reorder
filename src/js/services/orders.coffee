'use strict'

angular.module 'flickrSimpleReorder'
.constant 'Orders',
  Photosets:
    byUploadTime: (photos, isDesc = false) ->
      duration = if isDesc then -1 else 1
      _.sortBy photos, (photo) -> parseInt(photo.dateupload, 10) * duration

    byTakenTime: (photos, isDesc = false) ->
      duration = if isDesc then -1 else 1
      _.sortBy photos, (photo) -> new Date(photo.datetaken).valueOf() * duration

    byTitle: (photos, isDesc = false) ->
      newOrder = _.sortBy photos, (photo) -> photo.title
      if isDesc then newOrder.reverse() else newOrder

    byViews: (photos, isDesc = false) ->
      duration = if isDesc then -1 else 1
      _.sortBy photos, (photo) -> parseInt(photo.views, 10) * duration

    orderBy: (photos, order, isDesc = false) ->
      switch order
        when 'uploadTime'
          @byUploadTime photos, isDesc
        when 'takenTime'
          @byTakenTime photos, isDesc
        when 'title'
          @byTitle photos, isDesc
        when 'views'
          @byViews photos, isDesc

    availableOrders: [
      code: 'uploadTime'
      display: 'Upload Time'
    ,
      code: 'takenTime'
      display: 'Taken Time'
    ,
      code: 'title'
      display: 'Title'
    ,
      code: 'views'
      display: 'Views Count'
    ]
