
Ext.define('rcranley.override.Reader', {
    override: 'Ext.data.reader.Reader',

    readRecords: function(data) {
        var me  = this;

        /**
         * @property {Object} rawData
         * The raw data object that was last passed to readRecords. Stored for further processing if needed
         */
        me.rawData = data;

        data = me.getData(data);

        if (data.metaData) {
            me.onMetaChange(data.metaData);
        }

        // <debug>
        if (!me.getModel()) {
            Ext.Logger.warn('In order to read record data, a Reader needs to have a Model defined on it.');
        }
        // </debug>

        // If we pass an array as the data, we don't use getRoot on the data.
        // Instead the root equals to the data.
        var isArray = Ext.isArray(data),
            root = isArray ? data : me.getRoot(data),
            success = true,
            recordCount = 0,
            total, value, records, message;

/************************************************
 * This is an override for Bug TOUCH-3727.
 * See http://www.sencha.com/forum/showthread.php?249443-Sencha-Touch-2.1-marks-Ajax-JSON-response-as-failed-if-server-returns-empty-array
 * for mor details
 ************************************************
         if (isArray && !data.length) {
-            return me.nullResultSet;
+            return new Ext.data.ResultSet({
+                total  : 0,
+                count  : 0,
+                records: [],
+                success: true
+            });
         }


        if (isArray && !data.length) {
            return me.nullResultSet;
        }
*/
        if (isArray && !data.length) {
            return new Ext.data.ResultSet({
                total  : 0,
                count  : 0,
                records: [],
                success: true
            });
        }

        // buildExtractors should have put getTotal, getSuccess, or getMessage methods on the instance.
        // So we can check them directly
        if (me.getTotal) {
            value = parseInt(me.getTotal(data), 10);
            if (!isNaN(value)) {
                total = value;
            }
        }

        if (me.getSuccess) {
            value = me.getSuccess(data);
            if (value === false || value === 'false') {
                success = false;
            }
        }

        if (me.getMessage) {
            message = me.getMessage(data);
        }

        if (root) {
            records = me.extractData(root);
            recordCount = records.length;
        } else {
            recordCount = 0;
            records = [];
        }

        return new Ext.data.ResultSet({
            total  : total,
            count  : recordCount,
            records: records,
            success: success,
            message: message
        });
    }
});
