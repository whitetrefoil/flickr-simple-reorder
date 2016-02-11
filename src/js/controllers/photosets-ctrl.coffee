'use strict'

angular.module 'flickrSimpleReorder'
.controller 'PhotosetsCtrl', [
  '$scope'
  '$rootScope'
  '$document'
  '$localStorage'
  '$uibModal'
  'Photosets'
  'Orders'
  'Modals'
  'user'
  (
    $scope
    $rootScope
    $document
    $ls
    $uibModal
    Photosets
    Orders
    Modals
    user
  ) ->
    photosets = []

    filter = ->
      $scope.photosets = if $scope.isFilterEnabled and !_.isEmpty($scope.filterString)
        photosets.filter (photoset) ->
          photoset.title._content.toLowerCase().indexOf($scope.filterString.toLowerCase()) >= 0
      else
        photosets
      $scope.totalPhotosets = $scope.photosets.length

    getList = ->
      Photosets.getList(user.nsid).then (data) ->
        photosets = data.photoset
        filter()

    $scope.reorder = (photoset) ->
      orderCode = $scope.selectedOrder.code
      isPreferDescending = $ls['isPreferDescending']
      photoset.state = 'reordering'
      Photosets.getPhotos photoset.id, parseInt(photoset.photos, 10)
      .then (photos) ->
        idsBeforeOrdering = _.map photos, 'id'
        idsAfterOrdering = _.map Orders.Photosets.orderBy(photos, orderCode, isPreferDescending), 'id'
        if _.isEqual idsBeforeOrdering, idsAfterOrdering
          photoset.state = 'skipped'
        else
          photoset.state = 'syncing'
          Photosets.reorderPhotos photoset.id, idsAfterOrdering
          .then ->
            photoset.state = 'done'
      .catch ->
        photoset.state = 'failed'

    $scope.reorderAll = (photosets = $scope.photosets)->
      Modals.reorderAllConfirm
        photosetsCount: photosets.length
      .then ->
        Modals.syncProgress
          orderings: _.map photosets, (photoset) -> $scope.reorder photoset
        .catch (failedPhotosets) ->
          $scope.reorderAll(failedPhotosets)

    getList()

    $scope.$watch 'isFilterEnabled', -> filter()
    $scope.$watch 'filterString', (val) ->
      $scope.isFilterEnabled = !_.isEmpty(val)
      filter()

    $scope.perPage = if $document.outerWidth() < 768 then 5 else 12
    $scope.maxSize = 5
    $scope.page = 1
    $scope.availableOrders = Orders.Photosets.availableOrders
    if $ls['preferredOrder']?
      $scope.selectedOrder = _.find $scope.availableOrders, 'code', $ls['preferredOrder']
    $scope.selectedOrder ||= $scope.availableOrders[0]
    $scope.setOrder = (order) ->
      $scope.selectedOrder = order
      $ls['preferredOrder'] = order.code
    $scope.checkIsProcessing = ->
      _.some $scope.photosets, (photoset) ->
        photoset.state is 'reordering' or photoset.state is 'syncing'

]
