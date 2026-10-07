using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace NovaTechPlatform.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    Cod_Usuario = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Cor_Usuario = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Clv_Usuario = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Nom_Usuario = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Ape_Usuario = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Est_Usuario = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.Cod_Usuario);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_Cor_Usuario",
                table: "Usuario",
                column: "Cor_Usuario",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Usuario");
        }
    }
}
