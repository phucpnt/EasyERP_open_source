define([
    'Backbone',
    'jQuery',
    'Underscore',
    'views/tformViewBase',
    'text!templates/salesProforma/form/ContentTemplate.html',
    'text!templates/salesProforma/form/ListItemTemplate.html',
    'models/InvoiceModel',
    'views/Proforma/form/FormView',
    //'views/Proforma/CreateView',
    'views/Proforma/list/ListItemView',
    'views/Filter/filterView',
    'common',
    'constants'
], function (Backbone, $, _, TFormBaseView, ContentTemplate, ListItemTemplate, InvoiceModel, FormView, ListItemView, FilterView, common, CONSTANTS) {
    'use strict';

    var InvoicesListView = TFormBaseView.extend({
        listTemplate   : _.template(ListItemTemplate),
        contentTemplate: _.template(ContentTemplate),
        //CreateView     : CreateView,
        ListItemView   : ListItemView,
        listUrl        : 'easyErp/Proforma/list/',
        contentType    : CONSTANTS.SALESPROFORMA, // needs in view.prototype.changeLocationHash
        viewType       : 'tform', // needs in view.prototype.changeLocationHash
        hasPagination  : true,
        hasAlphabet    : false,
        formView       : null,
        selectedId     : null,
        ContentModel   : InvoiceModel,
        FormView       : FormView,
        forSales       : true,
        renderList: function(proforms) {
            var $thisEl = this.$el;
            var $listHolder = $thisEl.find('#listContent');

            $listHolder.append(this.listTemplate({
                proforms: proforms
            }))
        },


        renderFormView: function (modelId, cb) {
            var $thisEl = this.$el;
            var self = this;
            var model;
            var data;

            model = new this.ContentModel();
            //model.urlRoot = model.url() + modelId;

            data = {
                viewType   : 'form',
                id         : modelId,
                forSales   : this.forSales
            };

            model.fetch({
                data   : data,
                success: function (model) {

                    if (self.formView) {
                        self.formView.undelegateEvents();
                    }

                    self.formView = new self.FormView({model: model, el: '#formContent'});
                    self.formView.render();

                    $thisEl.find('#listContent .selected').removeClass('selected');
                    $thisEl.find('tr[data-id="' + modelId + '"]').addClass('selected');

                    self.selectedId = model.id;

                    if (cb && typeof cb === 'function') {
                        cb();
                    }
                },

                error: function () {
                    App.render({
                        type   : 'error',
                        message: 'Server error'
                    });
                }
            });
        },

        saveCurrentQuotation: function () {
            this.formView.saveItem();
        }
    });

    return InvoicesListView;
});